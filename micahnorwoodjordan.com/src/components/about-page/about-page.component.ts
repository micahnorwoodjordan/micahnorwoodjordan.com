import { Component } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-about-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
