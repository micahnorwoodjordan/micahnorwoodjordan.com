import { Component } from '@angular/core';

import { IndexComponent } from '../components/index/index.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    IndexComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micahnorwoodjordan.com';
}
