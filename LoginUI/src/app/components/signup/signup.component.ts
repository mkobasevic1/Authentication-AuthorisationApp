import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import ValidateForm from "../../helpers/validateform";

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

  constructor(private fb: FormBuilder){

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
      //send Object to db
    }
    else{
      ValidateForm.validateAllFormFields(this.formSignup);
      alert("Your form is invalid");
      //throw error using toaster
    }
    
  }

}
