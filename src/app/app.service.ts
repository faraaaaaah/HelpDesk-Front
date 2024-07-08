import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './Ticket';
import { User } from './User';
import { SignUpModel } from './pages/login/login.component';
import { environment } from './environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'http://localhost:8081';
  private apiUrl = `${environment.apiUrl}/api`; // Replace with your backend API URL
  constructor(private http: HttpClient) { }
  
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/api/users/checkEmail/${email}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.url}/api/register`, userData,{ observe: 'response' });
  }
  // Add User - Create
addTicket(data: any): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>(`${this.url}/tickets`, data, { headers });
}
updateTicketsForUser(user: User): Observable<any> {
  // Example: Update tickets where user id matches
  const updateData = {
    assignedId: user.id,
    assignedName: user.name,
    assignedLastname: user.lastname
    // Add other fields as needed to match your backend schema
  };

  // Replace with your API endpoint and HTTP method (PUT, PATCH, etc.)
  return this.http.put(`${this.url}/tickets/updateByUserId/${user.id}`, updateData);
}
// Get Users - Read
getTickets(): Observable<any[]>{
  return this.http.get<any[]>(`${this.url}/tickets`);
}

// Get User by Id - Read
getTicketById(id: string | number): Observable<Ticket> {
  return this.http.get<Ticket>(`${this.url}/tickets/${id}`);
}


// Update User - Update
updateTicket(id: number, ticket: Ticket): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.put<any>(`${this.url}/tickets/${id}`, ticket, { headers });
}


// Delete User - Delete
deleteTicket(id: number): Observable<any> {
  return this.http.delete<any>(`${this.url}/tickets/${id}`);
}


addUser(data: any): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>(`${this.url}/users`, data, { headers });
}

// Get Users - Read
getUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.url}/users`);
}
sendPasswordResetEmail(email: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  const body = `email=${email}`;
  return this.http.post(`${this.url}/forgot-password`, body, { headers });
}
// Get User by Id - Read
getUserById(id: string | number): Observable<User> {
  return this.http.get<User>(`${this.url}/users/${id}`);
}

// Update User - Update
updateUser(id?: number, user?: any): Observable<any>{
  return this.http.put<any>(`${this.url}/users/${id}`, user);
}

// Delete User - Delete
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/users/${id}`);
}

// registerUser(user: SignUpModel) {
//   //return this.http.post(this.url, user);
//   const headers = new HttpHeaders({'Content-Type': 'application/json'});
//   return this.http.post<any>(`${this.url}/users`, user, { headers });
// }
login(email: string, password: string) {
  return this.http.post<any>(`${this.url}`, { email, password });
}
register(email: string) {
  return this.http.post<any>(`${this.url}`, { email });
}

}
