import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ProjectCardComponent } from '../project-card/project-card.component';
import { ContextService } from '../../services/context.service';


@Component({
  selector: 'app-projects-page',
  imports: [
    MatList,
    MatListItem,
    FlexLayoutModule,
    NgIf,
    ProjectCardComponent
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {
  constructor(private contextService: ContextService) {  }

  imageURL: string = "";
  bodyText: string = "";
  projectName: string = "";
  projectSubtitle: string = "";
  projectURL: string = "";

  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
}
