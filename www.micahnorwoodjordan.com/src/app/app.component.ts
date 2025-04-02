import { Component } from '@angular/core';


import { BlankComponent } from './components/blank/blank.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TrackerComponent } from './components/tracker/tracker.component';


@Component({
  selector: 'app-root',
  imports: [
    BlankComponent,
    HeaderComponent,
    FooterComponent,
    CanvasComponent,
    TrackerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micahnorwoodjordan.com';

}
