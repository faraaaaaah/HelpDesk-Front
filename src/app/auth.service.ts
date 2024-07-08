import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from './environment/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  registerUser(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData, { observe: 'response' }).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        throw error;
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/check-email?email=${email}`);
  }
  
}