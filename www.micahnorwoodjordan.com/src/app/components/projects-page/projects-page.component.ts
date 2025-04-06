import { Component } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectCardComponent } from '../project-card/project-card.component';
import { ContextService } from '../../services/context.service';

import { Project } from '../../interfaces/Project';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-projects-page',
  imports: [
    AsyncPipe,
    FlexLayoutModule,
    NgIf,
    NgFor,
    ProjectCardComponent
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {
  constructor(private contextService: ContextService, private apiService: ApiService) {
    this.projects$ = this.apiService.getAllProjects();
  }

  imageURL: string = "";
  bodyText: string = "";
  projectName: string = "";
  projectSubtitle: string = "";
  projectURL: string = "";

  projects$: Observable<Project[]>;

  getUserIsOnMobile(): boolean { return this.contextService.userIsOnMobile; }
}
