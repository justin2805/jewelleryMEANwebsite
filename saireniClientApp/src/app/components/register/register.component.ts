import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../Utils/password.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rForm: FormGroup;
  form:any;
  fullName: string;
  email:string;
  password:string;
  confirmPassword:string;
  address:string;
  
  constructor(private fb: FormBuilder) { 
    this.rForm = fb.group({
      'fullName': [null, Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      'email': [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      'password': [null, Validators.compose(
        [Validators.required, Validators.minLength(8), Validators.maxLength(12)]
      )],
      'confirmPassword': [null, Validators.required],
      'address': [null, Validators.required],
      validator: PasswordValidation.MatchPassword
    })
  }

  ngOnInit() {
     
  }

  log(x) {console.log(x);}
  

  onSubmit(form){
    this.fullName = form.fullName;
  }
}
