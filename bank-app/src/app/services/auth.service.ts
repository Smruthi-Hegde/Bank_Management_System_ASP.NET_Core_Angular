import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5081/api/auth'; // Match the backend port

  constructor(private http: HttpClient) {}

  register(formData: { fullName: string; email: string; password: string }): Observable<any> {
    if (!formData.fullName || !formData.email || !formData.password) {
      throw new Error('All fields must be filled out');
    }
    return this.http.post(`${this.apiUrl}/register`, formData);
  }
  
  

  // login(formData: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, formData);
  // }

  login(formData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
}
