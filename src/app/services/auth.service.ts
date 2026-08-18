import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      },
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  logout(): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  isAuthenticated(): Observable<string> {

  return this.http.get(
    `${this.apiUrl}/me`,
    {
      responseType: 'text',
      withCredentials: true
    }
  );
}


}