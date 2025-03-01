import { Component } from '@angular/core';

import { AppRoutingContainerComponent } from '../components/index/index.component';

@Component({
  selector: 'app-root',
  imports: [
    AppRoutingContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micahnorwoodjordan.com';
}
