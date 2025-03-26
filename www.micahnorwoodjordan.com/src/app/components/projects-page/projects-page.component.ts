import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ProjectCardComponent } from '../project-card/project-card.component';


@Component({
  selector: 'app-projects-page',
  imports: [
    MatList,
    MatListItem,
    FlexLayoutModule,
    ProjectCardComponent
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {
  imageURL: string = "";
  bodyText: string = "";
  projectName: string = "";
  projectSubtitle: string = "";
  projectURL: string = "";
}
