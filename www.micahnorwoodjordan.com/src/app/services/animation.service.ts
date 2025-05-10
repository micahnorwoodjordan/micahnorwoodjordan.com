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

  // for text decryption visual effect
  private readonly charset = 'アァカサワガザダバンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private interval: any;

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

  applyDecryptionEffectToMarkupText(targetText: string, callback: (text: string) => void, speed: number = 25): void {
    let characterIndex = 0;

    this.clear(); // Clear any existing interval

    this.interval = setInterval(() => {
      if (characterIndex >= targetText.length) {
        callback(targetText); // Final state
        this.clear();
        return;
      }

      let scramble = '';
      for (let j = 0; j < targetText.length - characterIndex - 1; j++) {
        scramble += this.randomChar();
      }

      const partial = targetText.slice(0, characterIndex + 1) + scramble;
      callback(partial);

      characterIndex++;
    }, speed);
  }

  private randomChar(): string {
    return this.charset.charAt(Math.floor(Math.random() * this.charset.length));
  }

  clear(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
