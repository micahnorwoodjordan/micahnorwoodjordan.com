import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-footer',
  imports: [
    FlexLayoutModule,
    NgIf,
    MatCardModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private contextService: ContextService) {  }

  joshuaVerse: string = `"Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go." - NKJV`

  getUserIsOnMobile() { return this.contextService.userIsOnMobile; }
}
