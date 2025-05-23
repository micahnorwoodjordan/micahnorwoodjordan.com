import { Injectable } from '@angular/core';

import { Constants } from '../constants/Constants';

import { animate } from 'animejs';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  // -----------------------------------------------generic animations----------------------------------------------
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
  // -----------------------------------------------generic animations----------------------------------------------
  // -----------------------------------------------text decryption effect------------------------------------------
  private interval: any;

  private randomChar(): string {
    return Constants.matrixCharacters.charAt(Math.floor(Math.random() * Constants.matrixCharacters.length));
  }

  private clear(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  async applyDecryptionEffectToMarkupText(
    targetText: string,
    callback: (encryptedText: string, decryptedText: string) => void,
    speed: number = 100
  ): Promise<void> {
    // make a copy of the target string
    // set every character in the copy to a randomly generated character sequence consisting of matrix characters
    // every 1/10 seconds by default, replace one character in the copy with one true character from the target string by calling the callback function
    // which should update some string attribute of a component with the partially "decrypted" text

    let decryptedCharIdx = 0;

    this.clear(); // Clear any existing interval

    return new Promise((resolve) =>{
      this.interval = setInterval(() => {
        let decryptedText = targetText.slice(0, decryptedCharIdx + 1);
        let encryptedText = '';
  
        if (decryptedCharIdx >= targetText.length) {
          this.clear();
          callback(encryptedText, decryptedText);
          // if the caller function calls this method within a loop, make it await for the Promise to finally resolve
          // that way the decryption visual effect finishes on the current iteration before moving on to the next
          resolve();
        }
  
        for (let count = 0; count < targetText.length - decryptedCharIdx - 1; count++) {
          encryptedText += this.randomChar();
        }
  
        callback(encryptedText, decryptedText);
  
        decryptedCharIdx++;
      }, speed);
    })
  }
  // -----------------------------------------------text decryption effect------------------------------------------
}
