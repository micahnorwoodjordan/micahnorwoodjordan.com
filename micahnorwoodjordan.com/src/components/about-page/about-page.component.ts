import { Component } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-about-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FlexLayoutModule
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
