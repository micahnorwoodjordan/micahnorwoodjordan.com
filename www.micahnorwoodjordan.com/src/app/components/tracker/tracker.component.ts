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
  constructor(private contextService: ContextService, private mobileNavRef: ElementRef) { }

  public mobileNav: HTMLElement | null = null;
  private _bottomSheet = inject(MatBottomSheet);
  private windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  private scrollY: number = window.scrollY;
  private transitionComplete: boolean = false;

  public openBottomSheet() {
    const bottomsheetRef = this._bottomSheet.open(BottomsheetComponent); this.toggleTrackerVisibility(true);
    bottomsheetRef.afterDismissed().subscribe(() => this.toggleTrackerVisibility(false));
  }

  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setMobileNav(htmlElement: HTMLElement) { this.mobileNav = htmlElement; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }

  private _scale(complete: boolean, scaleValue: number) {  // used underscore to avoid namespacing clash with the css function
    if (this.mobileNav !== null) {
      this.mobileNav.style.scale = scaleValue.toString();
      this.mobileNav.style.transition = '1s';
    } else {
      console.log('TrackerComponent._scale: mobileNav is NULL');
    }
  }

  private changeColor(complete: boolean, colorCode: string) {
    if (this.mobileNav !== null) {
      this.mobileNav.style.color = colorCode;
      this.mobileNav.style.transition = '1s';
    } else {
      console.log('TrackerComponent.changeColor: mobileNav is NULL');
    }
  }

  private toggleTrackerVisibility(isVisible: boolean) {
    // NOTE: truthfully, the tracker translates updward (and i cant figure out why) when the bottomsheet is fired
    // hiding it is both avoids the visual issue while also creating a more graceful experience for user
    if (this.mobileNav !== null) {
      isVisible ? this.mobileNav.style.opacity = '0' : this.mobileNav.style.opacity = '100';
    } else {
      console.log('TrackerComponent.toggleTrackerVisibility: mobileNav is NULL');
    }
  }

  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setMobileNav(this.mobileNavRef.nativeElement.querySelector("#mobile-nav") as HTMLElement);
      window.addEventListener('load', () => this.trackToScrollYPosition());
      window.addEventListener('scroll', () => this.trackToScrollYPosition());
      this.animate();
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private trackToScrollYPosition() {
    if (this.mobileNav !== null) {
      if (this.scrollY !== null && this.windowHeight !== null) {
        let newPosition = window.scrollY + (this.windowHeight / 1.75);  // not sure what to name this raw decimal
        this.mobileNav.style.transition = 'top 0.5s ease-out 0.05s';
        this.mobileNav.style.top = `${newPosition}px`;
      }
    } else {
      console.log('TrackerComponent.trackToScrollYPosition: mobileNav is NULL');
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
