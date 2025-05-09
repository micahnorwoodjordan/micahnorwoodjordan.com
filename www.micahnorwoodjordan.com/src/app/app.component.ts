import { OnInit, Component, Renderer2 } from '@angular/core';


import { BlankComponent } from './components/blank/blank.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TrackerComponent } from './components/tracker/tracker.component';

import { environment } from '../environments/production';


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
  fontUrl =  `${environment.staticSiteUrl}/DinaRemasterCollection.ttc`;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const style = this.renderer.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'DinaRemaster';
        src: url('${this.fontUrl}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    this.renderer.appendChild(document.head, style);
  }
}
