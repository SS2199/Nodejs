import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://https://celescontainerwebapp-testing-e6dsepgybagsfmb4.westus3-01.azurewebsites.net'; // Replace with your Node.js backend URL

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages`);
  }

  addMessage(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-message`, { message });
  }
}
