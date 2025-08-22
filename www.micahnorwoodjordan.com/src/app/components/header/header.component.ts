import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ContextService } from '../../services/context.service';
import { environment } from '../../../environments/production';


@Component({
  selector: 'app-header',
  imports: [
    FlexLayoutModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private contextService: ContextService) {  }

  userIsOnMobile: boolean = false;
  displayRouterNav: boolean = false;
  headerTitle: string = "Micah Norwood";
  headerSubtitle: string = "Software Engineer";
  headerContent: string = "Full-Stack | DevOps | Infrastructure";
  resumeUrl: string = `${environment.staticSiteUrl}/Resume.pdf`;


  ngOnInit() { this.setUserIsOnMobile(this.contextService.userIsOnMobile); }

  setUserIsOnMobile(newValue: boolean) { this.userIsOnMobile = newValue; }

}
