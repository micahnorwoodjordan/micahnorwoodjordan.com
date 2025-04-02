import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BlankComponent } from './components/blank/blank.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ContextService } from './services/context.service';

@Component({
  selector: 'app-root',
  imports: [
    BlankComponent,
    HeaderComponent,
    FooterComponent,
    CanvasComponent,
    FlexLayoutModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor(private contextService: ContextService, private mobileNavRef: ElementRef) {  }

  title = 'micahnorwoodjordan.com';
  mobileNav: HTMLElement | null = null;
  windowHeight = window.innerHeight || document.documentElement.clientHeight;

  setMobileNav(htmlElement: HTMLElement) { this.mobileNav = htmlElement; }
  


  ngAfterViewInit() {
    if (this.getUserIsOnMobile()) {
      window.addEventListener('load', () => {
        if (this.mobileNav !== null) {
          let newPosition = window.scrollY + (this.windowHeight / 2);
          this.mobileNav.style.top = `${newPosition}px`;
        }
      });

      this.setMobileNav(this.mobileNavRef.nativeElement.querySelector("#mobile-nav") as HTMLElement);
      window.addEventListener('scroll', () => {
        if (this.mobileNav !== null) {
          
          let newPosition = window.scrollY + (this.windowHeight / 2);
          console.log(newPosition);
          console.log(this.windowHeight);
          this.mobileNav.style.top = `${newPosition}px`;
        }
      });
    }
  }
  getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
}
