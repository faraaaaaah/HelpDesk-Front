import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
 
  private url = 'http://localhost:8081';
  private apiUrl = 'http://localhost:8081/api/reset-password';

  constructor(private http: HttpClient) { }
  
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/users/checkEmail/${email}`);
  }
  getPasswordByEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.url}/api/get-password`, { email });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, newPassword });
  }
  
  sendPasswordResetEmail(email: string): Observable<any> {
    const url = `${this.url}/api/forgot-password?email=${email}`;
    return this.http.post<any>(url, {}).pipe(
      tap(response => console.log('Response from server:', response)),
      catchError(this.handleError)
    );
  }
  
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(errorMessage);
  }
  verifyResetCode(email: string, resetCode: string): Observable<any> {
    const body = { email, resetCode };
    return this.http.post(`${this.url}/api/verify-reset-code`, body).pipe(
      catchError(this.handleError)
    );
  }

  // resetPassword(email: string, newPassword: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = { email, newPassword };
  //   return this.http.post(this.apiUrl, body, { headers, responseType: 'text' }); // Note the 'responseType'
  // }
  
  
}
