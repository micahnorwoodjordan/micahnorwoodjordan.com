import { Injectable } from '@angular/core';

import { animate } from 'animejs';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  readonly transitionDurationString: string = "1s";
  readonly scrollYPositionCoefficient: number = 1.75;
  readonly easeAnimationString: string = "in(0.7)";
  readonly redrawIntervalMilliseconds: number = 1000;

  private elementIsValid(element: any): boolean { return element !== null && element !== undefined; }
  private logNullElementMessage(methodName: string) { console.log(`${methodName}: target element is null`); }

  // generic animation function to wrap the anime.js `animate` function and log change attempt
  animateElement(element: any, parameters: any, animationDescription: string) {
    if (this.elementIsValid(element)) {
      animate(element, parameters);
    } else {
      this.logNullElementMessage(animationDescription);
    }
  }
}
