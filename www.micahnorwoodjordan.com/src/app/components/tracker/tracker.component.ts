import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ContextService } from '../../services/context.service';
import { AnimationService } from '../../services/animation.service';
import { BottomsheetComponent } from '../bottomsheet/bottomsheet.component';


@Component({
  selector: 'app-tracker',
  imports: [
    FlexLayoutModule,
    NgIf,
    MatIconModule,
    MatBottomSheetModule
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements AfterViewInit {
  constructor(
    private readonly animationService: AnimationService,
    private readonly  contextService: ContextService,
    private readonly  trackerElementRef: ElementRef
  ) { }

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  private readonly trackerSelector: string = "#mobile-nav";
  private readonly green: string = "#219d51";
  private readonly orange: string = "orange";
  private readonly trackerScalingCoefficientGrow: number = 2;
  private readonly trackerScalingCoefficientShrink: number = 1.3;
  private scrollY: number = window.scrollY;
  private transitionComplete: boolean = false;
  private $tracker: any = null;

  public openBottomSheet() {
    const bottomsheetRef = this._bottomSheet.open(BottomsheetComponent);
    let opacityChangePayloadHide: any = { opacity: 0, duration: 250 }
    let opacityChangePayloadShow: any = { opacity: 1, duration: 250 }

    this.animationService.animateElement(this.$tracker, opacityChangePayloadHide, "changeing element opacity");
    bottomsheetRef.afterDismissed().subscribe(() => this.animationService.animateElement(this.$tracker, opacityChangePayloadShow, "changeing element opacity"));
  }

  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }
  private setTracker() { this.$tracker = this.trackerElementRef.nativeElement.querySelector(this.trackerSelector); }
  private setScrollY(newValue: number) { this.scrollY = newValue; }

  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setTracker();
      window.addEventListener('load', () => this.updateTrackerPosition());
      window.addEventListener('scroll', () => this.updateTrackerPosition());
      this.redrawTracker();
    } else {
      console.log(`TrackerComponent.ngAfterViewInit:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private updateTrackerPosition() {
    let trackerTranslationPayload: any = {
      top: this.scrollY + (this.windowHeight / this.animationService.scrollYPositionCoefficient),
      ease: this.animationService.easeAnimationString
    }
    this.setScrollY(window.scrollY);
    this.animationService.animateElement(this.$tracker, trackerTranslationPayload, "changing element Y position");
  }

  private redrawTracker() {
    setInterval(() => {
      let colorCodeChangePayload: any = {
        color: Math.round(Math.random()) === 1 ? this.green : this.orange,
        transition: this.animationService.transitionDurationString
      }
      let scaleChangePayload: any = {
        scale: this.transitionComplete ? this.trackerScalingCoefficientShrink : this.trackerScalingCoefficientGrow,
        transition: this.animationService.transitionDurationString
      }
      this.animationService.animateElement(this.$tracker, colorCodeChangePayload, "changing element color");
      this.animationService.animateElement(this.$tracker, scaleChangePayload, "changing element scale");
      this.setTransitionComplete(!this.transitionComplete);
    }, this.animationService.redrawIntervalMilliseconds)
  }
}
