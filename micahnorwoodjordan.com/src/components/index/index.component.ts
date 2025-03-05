import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-index',
  imports: [
    FlexLayoutModule,
    MatButtonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  myGithubURL: string = 'https://github.com/micahnorwoodjordan';
  myMusicURL: string = 'https://getmybeats.com';
  myLinkedinURL: string = 'https://www.linkedin.com/in/micah-norwood777';
  myAboutPageURL: string = 'http://localhost:4200/about';

  navigateToURL(url: string) { window.location.href = url; }
}
