import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { animate } from 'animejs';

import { ContextService } from '../../services/context.service';
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
  constructor(private contextService: ContextService, private trackerElementRef: ElementRef) { }

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  private readonly trackerSelector: string = "#mobile-nav";
  private scrollY: number = window.scrollY;
  private transitionComplete: boolean = false;
  private $tracker: any = null;

  public trackerElement: HTMLElement | null = null;
  

  public openBottomSheet() {
    const bottomsheetRef = this._bottomSheet.open(BottomsheetComponent); this.toggleTrackerVisibility(true);
    bottomsheetRef.afterDismissed().subscribe(() => this.toggleTrackerVisibility(false));
  }

  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setTrackerElement(htmlElement: HTMLElement) { this.trackerElement = htmlElement; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }
  private setTracker() { this.$tracker = this.trackerElementRef.nativeElement.querySelector(this.trackerSelector); }

  private _scale(scaleValue: number) {  // used underscore to avoid namespacing clash with the css function
    if (this.$tracker !== null) {
      animate(this.$tracker, { scale: scaleValue, transition: "1s" })
    } else {
      console.log('TrackerComponent._scale: trackerElement is NULL');
    }
  }

  private changeColor(colorCode: string) {
    if (this.$tracker !== null) {
      animate(this.$tracker, { color: colorCode, transition: "1s" })
    } else {
      console.log('TrackerComponent.changeColor: trackerElement is NULL');
    }
  }

  private toggleTrackerVisibility(isVisible: boolean) {
    // NOTE: truthfully, the tracker translates updward (and i cant figure out why) when the bottomsheet is fired
    // hiding it is both avoids the visual issue while also creating a more graceful experience for user
    if (this.trackerElement !== null) {
      isVisible ? this.trackerElement.style.opacity = '0' : this.trackerElement.style.opacity = '100';
    } else {
      console.log('TrackerComponent.toggleTrackerVisibility: trackerElement is NULL');
    }
  }

  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setTracker();
      this.setTrackerElement(this.trackerElementRef.nativeElement.querySelector("#mobile-nav") as HTMLElement);
      window.addEventListener('load', () => this.updateTrackerTopPosition());
      window.addEventListener('scroll', () => this.updateTrackerTopPosition());
      this.animate();
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private updateTrackerTopPosition() {
    let readyToTransform: boolean = this.$tracker !== null && this.scrollY !== null && this.windowHeight !== null;
    let scrollYPositionCoefficient: number = 1.75;
    let newTopPosition: number = window.scrollY + (this.windowHeight / scrollYPositionCoefficient);

    if (readyToTransform) {
      animate(this.$tracker, { top: newTopPosition, ease: 'out(0.5)' });
    } else {
      console.log('TrackerComponent.updateTrackerTopPosition: `$tracker` is NULL');
    }
  }

  private animate() {
    setInterval(() => {
      this.changeColor(Math.round(Math.random()) === 1 ? '#219d51' : 'orange');
      this._scale(this.transitionComplete ? 1.3 : 2);
      this.setTransitionComplete(!this.transitionComplete);
    }, 1000)
  }
}
