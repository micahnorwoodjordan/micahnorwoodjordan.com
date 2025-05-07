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

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${environment.staticSiteUrl}/DinaRemasterCollection.ttc`;
    this.renderer.appendChild(document.head, link);
  }
}
