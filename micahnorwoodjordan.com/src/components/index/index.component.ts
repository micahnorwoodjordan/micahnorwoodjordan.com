import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../environments/production';


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
  myAboutPageURL: string = `${environment.clientUrl}/about`;

  meStandingPNGURL: string = `${environment.staticSiteUrl}/me-standing.png`;
  meSittingPNGURL: string = `${environment.staticSiteUrl}/me-sitting.png`;

  myGithubPNGURL: string = `${environment.staticSiteUrl}/github.png`;
  myLinkedinPNGURL: string = `${environment.staticSiteUrl}/linkedin.png`;
  myMusicPNGURL: string = `${environment.staticSiteUrl}/getmybeats.png`;
  
  navigateToURL(url: string) { window.location.href = url; }
}
