import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { ContextService } from '../../services/context.service';


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
export class IndexComponent {
  constructor(private contextService: ContextService) {  }

  whoIsMicahText: string = "Micah is a devout Christian with a childlike love for building software. His goal is to honor Jesus in all aspects of life, even in the lines of code that he writes.";
  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
  getViewportWidth(): number { return this.contextService.viewportWidth; }
  getMeSittingPNGURL() { return this.contextService.meSittingPNGURL; }
}
