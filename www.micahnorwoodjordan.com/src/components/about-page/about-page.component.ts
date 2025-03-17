import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from '../../environments/production';
import { EmailMessage } from '../../app/interfaces/EmailMessage';
import { ApiService } from '../../app/services/api.service';
import { ContextService } from '../../app/services/context.service';


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
  constructor(private apiService: ApiService, private contextService: ContextService) {  }

  isWaitingForAPIResponse: boolean = false;
  encounteredError: boolean = false;

  ezrasPartyPNGURL: string = `${environment.staticSiteUrl}/me-ezra-party.png`;
  
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
  setEncounteredError(newValue: boolean) { this.encounteredError = newValue; }

  getUserIsOnMobile() { return this.contextService.userIsOnMobile; }

  private sendEmail(message: EmailMessage) {
    let url = `${environment.apiUrl}/notifications/email/send`;
    return this.apiService.sendEmailRequest(url, message);
  }

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

      this.sendEmail(message).subscribe({
        next: value => this.onNext(),
        error: error => this.onError(error),
        complete: () => this.onComplete()
      });

    } else{
      alert('Please ensure all form fields are properly filled out.');
    }
  }

  private onNext() {
    this.setIsWaitingForAPIResponse(true);
    this.setEncounteredError(false);
  }

  private onComplete() {
    this.setIsWaitingForAPIResponse(false);
    if (!this.encounteredError) {
      this.onSuccess();
      this.resetForm();
    }
  }

  private onSuccess() {
    alert("Email sent!")
  }

  private onError(error: any) {
    this.setIsWaitingForAPIResponse(false);
    this.setEncounteredError(true);

    // TODO make a modal
    // TODO maybe dont reset form unless success case
    alert("hmm...an unknown error has occurred. try again, and if that doesnt work, email me directly.");
  }

  private resetForm() { this.form.reset(); }
}
