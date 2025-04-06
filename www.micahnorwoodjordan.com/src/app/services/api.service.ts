import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/production';
import { EmailMessage } from '../interfaces/EmailMessage';
import { Project } from '../interfaces/Project';
import { Observable } from 'rxjs';

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
    return this.client.post<EmailMessage>(
      url,
      body, {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  getAllProjects(): Observable<Project[]> {
    let url = `${environment.apiUrl}/projects`;
    return this.client.get<Project[]>(url);
  }
}
