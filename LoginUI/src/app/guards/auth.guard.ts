import { CanActivate } from '@angular/router';
import {AuthService} from './../services/auth.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgToastService} from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private authService : AuthService, private router : Router, private toast : NgToastService){

  }
  canActivate() : boolean{
    if(this.authService.isLoggedin())
      return true;
    this.toast.error({detail:"ERROR",summary:"Please login first",duration:3000});
    this.router.navigate(['login']);
    return false;
  }
  
};
