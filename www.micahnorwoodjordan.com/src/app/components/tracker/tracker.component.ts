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
  private readonly scrollY: number = window.scrollY;
  private transitionComplete: boolean = false;
  private $tracker: any = null;

  public openBottomSheet() {
    const bottomsheetRef = this._bottomSheet.open(BottomsheetComponent);
    this.animationService.changeElementOpacity(this.$tracker, 0, 250);
    bottomsheetRef.afterDismissed().subscribe(() => this.animationService.changeElementOpacity(this.$tracker, 1, 1000));
  }

  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }
  private setTracker() { this.$tracker = this.trackerElementRef.nativeElement.querySelector(this.trackerSelector); }


  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setTracker();
      window.addEventListener('load', () => this.updateTrackerTopPosition());
      window.addEventListener('scroll', () => this.updateTrackerTopPosition());
      this.animateTracker();
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private updateTrackerTopPosition() {
    let readyToTransform: boolean = this.$tracker !== null && this.scrollY !== null && this.windowHeight !== null;
    let scrollYPositionCoefficient: number = 1.75;
    let newTopPosition: number = window.scrollY + (this.windowHeight / scrollYPositionCoefficient);

    if (readyToTransform) {
      this.animationService.translateElementVertically(this.$tracker, newTopPosition);
    }
  }

  private animateTracker() {
    setInterval(() => {
      this.animationService.changeElementColor(this.$tracker, Math.round(Math.random()) === 1 ? '#219d51' : 'orange');
      this.animationService.scaleElement(this.$tracker, this.transitionComplete ? 1.3 : 2);
      this.setTransitionComplete(!this.transitionComplete);
    }, 1000)
  }
}
