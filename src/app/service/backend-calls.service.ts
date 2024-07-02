import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendCallsService {

  constructor(private http: HttpClient) { }
  getHelloMessage(name:string):Observable<Message>{
    return this.http.get(environment.baseUrl+"/getHello/"+name)}
}
