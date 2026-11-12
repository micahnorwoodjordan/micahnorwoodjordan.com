import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { environment } from '../../../environments/production';
import { EmailMessage } from '../../interfaces/EmailMessage';
import { ApiService } from '../../services/api.service';
import { ContextService } from '../../services/context.service';
import { AnimationService } from '../../services/animation.service';
import { TextDecryptionVisualEffectMapping } from '../../interfaces/TextDecryptionVisualEffectMapping';
import { Constants } from '../../constants/Constants';

interface ChipGroup {
  label: string;
  chips: string[];
}

@Component({
  selector: 'app-about-page',
  imports: [
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})

export class AboutPageComponent implements OnInit {
  private readonly chipMaterialPath = '/artifacts/chips.txt';

  constructor(
    private readonly apiService: ApiService,
    private readonly contextService: ContextService,
    private readonly animationService: AnimationService,
    private readonly http: HttpClient
  ) {
    if (this.contextService.userIsOnMobile) {
      this.setScrollYPositionDecryptionEffectThreshold(window.innerHeight);
    }

    window.addEventListener('scroll', async () => {
      this.setScrollYPosition(window.scrollY);
      if (!this.decryptionEffectAlreadyTriggered) {
        if (this.scrollYPosition >= this.scrollYPositionDecryptionEffectThreshold) {
          this.setDecryptionEffectAlreadyTriggered(true);
          for (const textObject of [this.textObject1, this.textObject2, this.textObject3]) {
            await this.animationService.applyDecryptionEffectToMarkupText(textObject.targetString, (encrypted, decrypted) => {
             textObject.encryptedString = encrypted;
             textObject.decryptedString = decrypted;
            }, Constants.decryptionEffectSpeedMillisFaster);
          }
        }
      }
    })
  }

  chipGroups: ChipGroup[] = [];

  // TODO: fetch from api call
  skillTags: string[] = [
    'OOP',
    'CI/CD & DevOps',
    'PaaS Platforms',
    'IaC',
    'SaaS',
    'OOP',
    'POA&M',
    'REST API\'s',
    'Network Optimization',
    'Security Control Validation',
    'Test Automation',
    'Containerization/Virtual Machines',
    'Systems Administration',
    'AWS Technologies',
    'Cloud Architecture',
    'Vulnerability Management',
    'Database Design'
  ];

  scrollYPosition: number = 0;
  decryptionEffectAlreadyTriggered: boolean = false;
  scrollYPositionDecryptionEffectThreshold: number = window.innerHeight / 4;
  isWaitingForAPIResponse: boolean = false;
  encounteredError: boolean = false;

  textObject1: TextDecryptionVisualEffectMapping = {
    targetString: "Maybe you need an API built -- done. Do you need it deployed to a cloud compute instance? Consider it handled. Perhaps you need to configure a firewall for your business -- check. What if a rogue process is consuming RAM and CPU in your system? I'll find it. Application services need to be containerized? Easy peasy. In need of synchronous and asynchronous data processing queues? No worries.",
    encryptedString: "",
    decryptedString: ""
  };
  textObject2: TextDecryptionVisualEffectMapping = {
    targetString: "And this is just the tip of the iceberg.",
    encryptedString: "",
    decryptedString: ""
  };
  textObject3: TextDecryptionVisualEffectMapping = {
    targetString: "I have 5 years' experience in building and testing secure and performant distributed SaaS applications, while maintaining legacy systems to serve millions of daily users worldwide. Throughout my career, I've tackled a laundry list of technical challenges, and have honed my skills in developing robust backend systems that enhance user experiences. My calculated approach to translating customer needs into software results in satisfied customers. Independently motivated, but customer-focused, I thrive on building complex, fault-tolerant systems.",
    encryptedString: "",
    decryptedString: ""
  };
  
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

  setScrollYPositionDecryptionEffectThreshold(newValue: number) { this.scrollYPositionDecryptionEffectThreshold = newValue; }
  setDecryptionEffectAlreadyTriggered(newValue: boolean) { this.decryptionEffectAlreadyTriggered = newValue; }
  setScrollYPosition(newValue: number) { this.scrollYPosition = newValue; }
  setIsWaitingForAPIResponse(newValue: boolean) { this.isWaitingForAPIResponse = newValue; }
  setEncounteredError(newValue: boolean) { this.encounteredError = newValue; }

  ngOnInit() {
    this.http.get(this.chipMaterialPath, { responseType: 'text' }).subscribe({
      next: contents => {
        this.chipGroups = this.parseChipFile(contents);
      },
      error: () => {
        this.chipGroups = [];
      }
    });
  }

  getUserIsOnMobile() { return this.contextService.userIsOnMobile; }

  private parseChipFile(contents: string): ChipGroup[] {
    return contents
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const separator = line.indexOf(':');
        const label = (separator === -1 ? line : line.slice(0, separator)).trim();
        const chips = (separator === -1 ? '' : line.slice(separator + 1))
          .split('·')
          .map(chip => chip.trim())
          .filter(chip => chip.length > 0);
        return { label, chips };
      })
      .filter(group => group.label.length > 0 && group.chips.length > 0);
  }

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
