import { Component } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-about-page',
  imports: [
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
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

  onSubmit() {
    if (this.form.valid) {
      let message: string = `${this.firstName.value} ${this.lastName.value} says to ${this.email.value} ${this.message.value}`;
      console.log(message);
      this.sendEmail();
      this.resetForm();
    } else{
      alert(this.form.get('firstName')?.hasError('required'))
      alert('Please ensure all form fields are properly filled out.');
    }
  }

  private resetForm() {
    this.firstName.reset();
    this.lastName.reset();
    this.email.reset();
    this.message.reset();
  }

  private sendEmail() { return; }
}
