import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {

  @Input() imageURL: string = "https://static.micahnorwoodjordan.com/me-sitting.png";
  @Input() bodyText: string = "";
  @Input() projectName: string = "";
  @Input() projectSubtitle: string = "";
  @Input() projectURL: string = "";

  navigateToURL(url: string) { window.location.href = url; }

  onClick() { this.navigateToURL(this.projectURL); }
}
