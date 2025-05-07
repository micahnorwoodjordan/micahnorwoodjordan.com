import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    NgIf
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {

  @Input() projectImageURL: string = "";
  @Input() bodyText: string = "";
  @Input() projectName: string = "";
  @Input() projectSubtitle: string = "";
  @Input() projectURL: string = "";
  @Input() userIsOnMobile: boolean = false;

  navigateToURL(url: string) { window.location.href = url; }

  onClick() { this.navigateToURL(this.projectURL); }
}
