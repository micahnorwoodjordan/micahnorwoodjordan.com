import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

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

  public trackerElement: HTMLElement | null = null;
  private _bottomSheet = inject(MatBottomSheet);
  private windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  private scrollY: number = window.scrollY;
  private transitionComplete: boolean = false;

  public openBottomSheet() {
    const bottomsheetRef = this._bottomSheet.open(BottomsheetComponent); this.toggleTrackerVisibility(true);
    bottomsheetRef.afterDismissed().subscribe(() => this.toggleTrackerVisibility(false));
  }

  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setTrackerElement(htmlElement: HTMLElement) { this.trackerElement = htmlElement; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }

  private _scale(complete: boolean, scaleValue: number) {  // used underscore to avoid namespacing clash with the css function
    if (this.trackerElement !== null) {
      this.trackerElement.style.scale = scaleValue.toString();
      this.trackerElement.style.transition = '1s';
    } else {
      console.log('TrackerComponent._scale: trackerElement is NULL');
    }
  }

  private changeColor(complete: boolean, colorCode: string) {
    if (this.trackerElement !== null) {
      this.trackerElement.style.color = colorCode;
      this.trackerElement.style.transition = '1s';
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
      this.setTrackerElement(this.trackerElementRef.nativeElement.querySelector("#mobile-nav") as HTMLElement);
      window.addEventListener('load', () => this.trackToScrollYPosition());
      window.addEventListener('scroll', () => this.trackToScrollYPosition());
      this.animate();
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private trackToScrollYPosition() {
    if (this.trackerElement !== null) {
      if (this.scrollY !== null && this.windowHeight !== null) {
        let newPosition = window.scrollY + (this.windowHeight / 1.75);  // not sure what to name this raw decimal
        this.trackerElement.style.transition = 'top 0.5s ease-out 0.05s';
        this.trackerElement.style.top = `${newPosition}px`;
      }
    } else {
      console.log('TrackerComponent.trackToScrollYPosition: trackerElement is NULL');
    }
  }

  private animate() {
    setInterval(() => {
      this.changeColor(this.transitionComplete, Math.round(Math.random()) === 1 ? '#219d51' : 'orange');
      this._scale(this.transitionComplete, this.transitionComplete ? 1.3 : 2);
      this.setTransitionComplete(!this.transitionComplete)
    }, 1000)
  }
}
