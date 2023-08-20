import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import ValidateForm from "../../helpers/validateform"

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
  
  constructor(private fb : FormBuilder){

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

  onSubmit(){
    if(this.loginForm.valid){
      //send Object to db
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
      //throw error using toaster
    }
  }

}
