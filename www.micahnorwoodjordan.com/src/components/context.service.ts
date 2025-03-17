import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  MOBILE_VIEWPORT_WIDTH_MAX: number = 500;

  viewportWidth: number = window.screen.width;
  viewportHeight: number = window.screen.height;
  userIsOnMobile: boolean = this.viewportWidth < this.MOBILE_VIEWPORT_WIDTH_MAX;

  getUserIsOnMobile(): boolean { return this.userIsOnMobile; }
  getViewportWidth(): number { return this.viewportWidth; }
}
