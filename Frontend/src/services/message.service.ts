import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Replace with your Azure App Service URL
  private apiUrl: string = 'https://celescontainerwebapp-testing-e6dsepgybagsfmb4.westus3-01.azurewebsites.net';

  constructor(private http: HttpClient) { }

  // Fetch messages
  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/messages`);
  }

  // Add a new message
  addMessage(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-message`, { message });
  }
}
