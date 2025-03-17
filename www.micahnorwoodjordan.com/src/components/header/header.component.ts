import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ContextService } from '../context.service';


@Component({
  selector: 'app-header',
  imports: [
    FlexLayoutModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private contextService: ContextService) {  }

  userIsOnMobile: boolean = false;

  ngOnInit() { this.setUserIsOnMobile(this.contextService.getUserIsOnMobile()); this.setUserIsOnMobile(true) }

  setUserIsOnMobile(newValue: boolean) { this.userIsOnMobile = newValue; }
}
