import { Component } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { IndexComponent } from '../components/index/index.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micahnorwoodjordan.com';
}
