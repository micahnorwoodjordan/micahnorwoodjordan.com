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
  private scrollY: number = window.scrollY;
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
  private setScrollY(newValue: number) { this.scrollY = newValue; }

  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setTracker();
      window.addEventListener('load', () => this.updateTrackerPosition());
      window.addEventListener('scroll', () => this.updateTrackerPosition());
      this.redrawTracker();
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private updateTrackerPosition() {
    this.setScrollY(window.scrollY);
    this.animationService.translateElementVertically(this.$tracker, this.scrollY, this.windowHeight)
  }

  private redrawTracker() {
    setInterval(() => {
      this.animationService.changeElementColor(this.$tracker, Math.round(Math.random()) === 1 ? this.green : this.orange);
      this.animationService.scaleElement(this.$tracker, this.transitionComplete ? 1.3 : 2);
      this.setTransitionComplete(!this.transitionComplete);
    }, 1000)
  }

}
