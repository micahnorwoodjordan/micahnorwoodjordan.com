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
  meSittingPNGURL: string = `${environment.staticSiteUrl}/me-sitting.png`;
}
