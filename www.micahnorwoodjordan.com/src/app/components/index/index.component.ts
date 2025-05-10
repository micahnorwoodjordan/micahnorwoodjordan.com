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

  whoIsMicahText: string = "Micah is a devout Christian with a childlike love for building software. His goal is to honor Jesus in all aspects of life, even in the lines of code that he writes.";
  micahNoteText: string = "(Also, if you couldn't tell, his favorite color is green, and he loves the Matrix movies)";

  // no actual decryption is taking place; this just refers to a visual effect
  whoIsMicahDecryptedText: string = '';
  micahNoteDecryptedText: string = '';

  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
  getViewportWidth(): number { return this.contextService.viewportWidth; }
  getMeSittingPNGURL() { return this.contextService.meSittingPNGURL; }

  ngAfterViewInit(): void {
    this.animationService.applyDecryptionEffectToMarkupText(this.whoIsMicahText, (text) => {
      this.whoIsMicahDecryptedText = text;
    }, 12);

    setTimeout(() => {  // delay for 5 seconds because both methods will otherwise compete for the same interval
      this.animationService.applyDecryptionEffectToMarkupText(this.micahNoteText, (text) => {
        this.micahNoteDecryptedText = text;        
      }, 50);
    }, 5000)
  }
}
