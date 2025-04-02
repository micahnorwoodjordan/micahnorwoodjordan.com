import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ContextService } from '../../services/context.service';


@Component({
  selector: 'app-tracker',
  imports: [
    FlexLayoutModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements AfterViewInit {
  constructor(private contextService: ContextService, private mobileNavRef: ElementRef) { }

  mobileNav: HTMLElement | null = null;
  windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  scrollY: number = window.scrollY;

  public openBottomSheet() {  }
  public getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
  private setMobileNav(htmlElement: HTMLElement) { this.mobileNav = htmlElement; }
  
  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      this.setMobileNav(this.mobileNavRef.nativeElement.querySelector("#mobile-nav") as HTMLElement);
      window.addEventListener('load', () => this.trackToScrollYPosition());
      window.addEventListener('scroll', () => this.trackToScrollYPosition());
    } else {
      console.log(`AppComponent initialization summary:\ngetUserIsOnMobile: ${this.getUserIsOnMobile()}`);
    }
  }

  private trackToScrollYPosition() {
    if (this.mobileNav !== null && this.scrollY !== null && this.windowHeight !== null) {
      let newPosition = window.scrollY + (this.windowHeight / 1.5);  // not sure what to name this raw decimal
      this.mobileNav.style.transition = 'top 0.5s ease-out 0.05s';
      this.mobileNav.style.top = `${newPosition}px`;
    } else {
      console.log(`AppComponent initialization summary (ERROR):\nmobile nav null check: ${this.mobileNav === null}\nscrollY: ${this.scrollY}\nwindowInnerHeight: ${this.windowHeight}`)
    }
  }
}
