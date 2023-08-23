import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import ValidateForm from "../../helpers/validateform"
import {AuthService} from "./../../services/auth.service";
import {Router} from '@angular/router';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type:string = "password";
  isText:boolean = false;
  eyeIcon:string="fa-eye-slash";
  loginForm!: FormGroup;
  
  constructor(private fb : FormBuilder, private auth : AuthService, private router  : Router, private toast : NgToastService){

  }

  ngOnInit():void{
    this.loginForm = this.fb.group(
      {
        username : ['',Validators.required],
        password : ['',Validators.required]
      }
    )
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.type="text" : this.type="password";
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
  }

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next: (res=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:3000});
          this.loginForm.reset();          
          this.auth.storeToken(res.token);
          this.router.navigate(['dashboard']);
        }),
        error: (err=>{
          this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000});
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toast.error({detail:"ERROR",summary:"Your form is invalid",duration:5000})
    }
  }

}
