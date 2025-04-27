import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/production';
import { EmailMessage } from '../interfaces/EmailMessage';
import { Project } from '../interfaces/Project';
import { APIConstants } from '../api/APIConstants';
import { APIResponse } from '../api/interfaces/APIResponse';

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

  getAllProjects(): Observable<APIResponse<Project[]>> {
    let url = `${environment.apiUrl}/projects`;
    return this.client.get<APIResponse<Project[]>>(url, {
      headers: new HttpHeaders().set(APIConstants.apiV2HeaderName, APIConstants.apiV2HeaderValue)
    });
  }
}
