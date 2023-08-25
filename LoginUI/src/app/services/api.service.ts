import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://localhost:7149/api/Users/";

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
