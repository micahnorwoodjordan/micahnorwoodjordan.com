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

  public openBottomSheet() { this._bottomSheet.open(BottomsheetComponent); }
  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setMobileNav(htmlElement: HTMLElement) { this.mobileNav = htmlElement; }
  private setTransitionComplete(newValue: boolean) { this.transitionComplete = newValue; }

  private _scale(complete: boolean, scaleValue: number) {  // used underscore to avoid namespacing clash with the css function
    if (this.mobileNav !== null) {
      this.mobileNav.style.scale = scaleValue.toString();
      this.mobileNav.style.transition = '1s';
    }
  }

  private changeColor(complete: boolean, colorCode: string) {
    if (this.mobileNav !== null) {
      this.mobileNav.style.color = colorCode;
      this.mobileNav.style.transition = '1s';
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
    if (this.mobileNav !== null && this.scrollY !== null && this.windowHeight !== null) {
      let newPosition = window.scrollY + (this.windowHeight / 1.75);  // not sure what to name this raw decimal
      this.mobileNav.style.transition = 'top 0.5s ease-out 0.05s';
      this.mobileNav.style.top = `${newPosition}px`;
    } else {
      console.log(`AppComponent initialization summary (ERROR):\nmobile nav null check: ${this.mobileNav === null}\nscrollY: ${this.scrollY}\nwindowInnerHeight: ${this.windowHeight}`)
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
