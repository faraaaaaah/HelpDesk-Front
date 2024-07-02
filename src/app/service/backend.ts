// src/app/your.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YourService {
  private apiUrl = 'http://localhost:8081/api/your-endpoint'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Other CRUD methods
}
