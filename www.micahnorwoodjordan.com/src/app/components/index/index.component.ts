import { Component, AfterViewInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { ContextService } from '../../services/context.service';
import { AnimationService } from '../../services/animation.service';

import { TextDecryptionVisualEffectMapping } from '../../interfaces/TextDecryptionVisualEffectMapping';


@Component({
  selector: 'app-index',
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    NgIf,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit {
  constructor(private contextService: ContextService, private animationService: AnimationService) {  }

  // no actual decryption is taking place; this just refers to a visual effect
  private readonly whoIsMicahDecryptionSpeedMilliseconds: number = 25;

  whoIsMicahTextObject: TextDecryptionVisualEffectMapping = {
    targetString: "Micah is a devout Christian with a childlike love for building software. His goal is to honor Jesus in all aspects of life, even in the lines of code that he writes.",
    encryptedString: "",
    decryptedString: ""
  };
  micahNoteTextObject: TextDecryptionVisualEffectMapping = {
    targetString: "(He also loves the Matrix movies, and his favorite color is green)",
    encryptedString: "",
    decryptedString: ""
  };


  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
  getViewportWidth(): number { return this.contextService.viewportWidth; }
  getMeSittingPNGURL() { return this.contextService.meSittingPNGURL; }

  async ngAfterViewInit(): Promise<void> {
    for (const textObject of [this.whoIsMicahTextObject, this.micahNoteTextObject]) {
      await this.animationService.applyDecryptionEffectToMarkupText(textObject.targetString, async (encrypted, decrypted) => {
        textObject.decryptedString = decrypted;
        textObject.encryptedString = encrypted;
      }, this.whoIsMicahDecryptionSpeedMilliseconds);
    };
  }
}
