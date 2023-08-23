import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7149/api/Users/";

  constructor(private http : HttpClient, private router : Router) { }

  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedin():boolean{
    return !!localStorage.getItem('token');
  }

}
