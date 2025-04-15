import { Injectable } from '@angular/core';

import { animate } from 'animejs';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  transitionDurationString: string = "1s";

  logNullElementMessageFromMethodCall(methodName: string) { console.log(`${methodName}: target element is null`); }

  animateElement(element: any, parameters: any) {
    animate(element, parameters)
  }

  changeElementColor(element: any, colorCode: string, transition: string = this.transitionDurationString) {
    if (element !== null) {
      animate(element, { color: colorCode, transition: transition });
    } else {
      this.logNullElementMessageFromMethodCall("AnimationService.changeElementColor");
    }
  }

  scaleElement(element: any, scaleCoefficient: number, transition: string = this.transitionDurationString) {
    if (element !== null) {
      animate(element, { scale: scaleCoefficient, transition: transition });
    } else {
      this.logNullElementMessageFromMethodCall("AnimationService.scaleElement");
    }
  }

  translateElementVertically(element: any, scrollY: number, windowHeight: number) {
    let readyToTransform: boolean = element !== null && scrollY !== null && windowHeight !== null;
    let scrollYPositionCoefficient: number = 1.75;
    let newTopPosition: number = scrollY + (windowHeight / scrollYPositionCoefficient);

    if (readyToTransform) {
      animate(element, { top: newTopPosition, ease: "out(0.5)" });
    } else {
      this.logNullElementMessageFromMethodCall("AnimationService.translateElementVertically");
    }
  }

  changeElementOpacity(element: any, opacityValue: number, duration: number) {
    if (element !== null) {
      animate(element, { opacity: opacityValue, duration: duration });
    } else {
      this.logNullElementMessageFromMethodCall("AnimationService.changeElementOpacity");
    }
  }

}
