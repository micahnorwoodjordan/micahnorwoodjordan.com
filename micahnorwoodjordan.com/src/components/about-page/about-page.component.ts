import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpEventType } from '@angular/common/http';

import { environment } from '../../environments/production';
import { EmailMessage } from '../../app/interfaces/EmailMessage';
import { ApiService } from '../../app/services/api.service';


@Component({
  selector: 'app-about-page',
  imports: [
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})

export class AboutPageComponent {
  constructor(private apiService: ApiService) {  }

  isWaitingForAPIResponse: boolean = false;

  bowlingBallPNGURL: string = `${environment.clientUrl}/bowling-ball.png`;
  
  firstName = new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]);
  lastName = new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  message = new FormControl('', [Validators.required, Validators.min(1), Validators.max(120)]);

  form = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    message: this.message
  });

  setIsWaitingForAPIResponse(newValue: boolean) { this.isWaitingForAPIResponse = newValue; }

  // TODO: add snackbar after backend responds
  // https://material.angular.io/components/snack-bar/examples
  onSubmit() {
    if (this.form.valid) {
      let message: EmailMessage = {
        senderFirstName: this.firstName.value,
        senderLastName: this.lastName.value,
        senderEmailAddress: this.email.value,
        messageBody: this.message.value,
      };

      this.sendEmail(message).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.setIsWaitingForAPIResponse(false);
          this.resetForm();
        } else {
          this.setIsWaitingForAPIResponse(true);
        }
      })

    } else{
      alert('Please ensure all form fields are properly filled out.');
    }
  }

  private resetForm() { this.form.reset(); }
  private sendEmail(message: EmailMessage) {
    let url = `${environment.apiUrl}/notifications/email/send`;
    return this.apiService.sendEmailRequest(url, message);
  }
}
