import { Component, AfterViewInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { ContextService } from '../../services/context.service';
import { AnimationService } from '../../services/animation.service';


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

  private readonly whoIsMicahText: string = "Micah is a devout Christian with a childlike love for building software. His goal is to honor Jesus in all aspects of life, even in the lines of code that he writes.";
  private readonly micahNoteText: string = "(He also loves the Matrix movies, and his favorite color is green)";

  // no actual decryption is taking place; this just refers to a visual effect
  private readonly whoIsMicahDecryptionSpeedMilliseconds: number = 25;
  private readonly micahNoteDecryptionSpeedMilliseconds: number = 50;
  whoIsMicahDecryptedText: string = '';
  whoIsMicahEncryptedText: string = '';
  // micahNoteDecryptedText: string = '';

  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
  getViewportWidth(): number { return this.contextService.viewportWidth; }
  getMeSittingPNGURL() { return this.contextService.meSittingPNGURL; }

  ngAfterViewInit(): void {
    this.animationService.applyDecryptionEffectToMarkupText(this.whoIsMicahText, (encrypted, decrypted) => {
      this.whoIsMicahDecryptedText = decrypted;
      this.whoIsMicahEncryptedText = encrypted;
    }, this.whoIsMicahDecryptionSpeedMilliseconds);

    // setTimeout(() => {  // delay for 5 seconds because both methods will otherwise compete for the same interval
    //   this.animationService.applyDecryptionEffectToMarkupText(this.micahNoteText, (text) => {
    //     this.micahNoteDecryptedText = text;        
    //   }, this.micahNoteDecryptionSpeedMilliseconds);
    // }, 5000)
  }
}
