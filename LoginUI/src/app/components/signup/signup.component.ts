import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import ValidateForm from "../../helpers/validateform";
import {AuthService} from './../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router){

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
          alert(res.message);
          this.formSignup.reset();
          this.router.navigate(['login']);
        }),
        error: (err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.formSignup);
      alert("Your form is invalid");
      //throw error using toaster
    }
    
  }

}
