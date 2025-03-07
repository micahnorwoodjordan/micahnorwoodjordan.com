import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/production';
import { EmailMessage } from '../interfaces/EmailMessage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) { }

  ping() {
    let url = `${environment.apiUrl}/ping`;
     return this.client.get(url);
  }

  sendEmailRequest(url: string, body: EmailMessage) {
    return this.client.post<EmailMessage>(url, body).subscribe(config => {
      console.log(body)
      console.log(config);
    })
  }
}
