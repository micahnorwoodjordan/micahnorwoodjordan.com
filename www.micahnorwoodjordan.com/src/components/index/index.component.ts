import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

import { ContextService } from '../../app/services/context.service';


@Component({
  selector: 'app-index',
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(private contextService: ContextService) {  }

  whoIsMicahText: string = "Micah is a devout Christian with a childlike love for building software. His goal is to honor Jesus in all aspects of life, even in the lines of code that he writes.";
  
  navigateToURL(url: string) { window.location.href = url; }

  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
  getViewportWidth(): number { return this.contextService.viewportWidth; }

  // other urls
  getMyGithubURL() { return this.contextService.myGithubURL; }
  getMyMusicURL() { return this.contextService.myMusicURL; }
  getMyLinkedinURL() { return this.contextService.myLinkedinURL; }
  getMyAboutPageURL() { return this.contextService.myAboutPageURL; }

  // regular content urls
  getMeStandingPNGURL() { return this.contextService.meStandingPNGURL; }
  getMeSittingPNGURL() { return this.contextService.meSittingPNGURL; }

  // png urls
  getMyGithubPNGURL() { return this.contextService.myGithubPNGURL; }
  getMyLinkedinPNGURL() { return this.contextService.myLinkedinPNGURL; }
  getMyMusicPNGURL() { return this.contextService.myMusicPNGURL; }
}
