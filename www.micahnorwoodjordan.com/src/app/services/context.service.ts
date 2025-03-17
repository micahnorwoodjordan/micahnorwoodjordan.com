import { Injectable } from '@angular/core';

import { environment } from '../../environments/production';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  MOBILE_VIEWPORT_WIDTH_MAX: number = 500;

  viewportWidth: number = window.screen.width;
  viewportHeight: number = window.screen.height;
  userIsOnMobile: boolean = this.viewportWidth < this.MOBILE_VIEWPORT_WIDTH_MAX;

  myGithubURL: string = 'https://github.com/micahnorwoodjordan';
  myMusicURL: string = 'https://getmybeats.com';
  myLinkedinURL: string = 'https://www.linkedin.com/in/micah-norwood777';
  myAboutPageURL: string = `${environment.clientUrl}/about`;
  myHomePageURL: string = `${environment.clientUrl}/home`;

  meStandingPNGURL: string = `${environment.staticSiteUrl}/me-standing.png`;
  meSittingPNGURL: string = `${environment.staticSiteUrl}/me-sitting.png`;

  myGithubPNGURL: string = `${environment.staticSiteUrl}/github.png`;
  myLinkedinPNGURL: string = `${environment.staticSiteUrl}/linkedin.png`;
  myMusicPNGURL: string = `${environment.staticSiteUrl}/getmybeats.png`;

}
