import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import ValidateForm from "../../helpers/validateform";
import {AuthService} from './../../services/auth.service';
import {Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string="fa-eye-slash";
  formSignup!:FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router, private toast : NgToastService){

  }

  ngOnInit():void {
    this.formSignup = this.fb.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.type="text" : this.type="password";
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
  }

  onSubmit(){
    if(this.formSignup.valid){
      this.auth.signup(this.formSignup.value).subscribe({
        next: (res=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:3000});
          this.formSignup.reset();
          this.router.navigate(['login']);
        }),
        error: (err=>{
          alert(err?.error.message)
          this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000});
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.formSignup);
      this.toast.error({detail:"ERROR",summary:"Your form is invalid",duration:5000});
    }
    
  }

}
