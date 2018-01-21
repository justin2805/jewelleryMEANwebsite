import { RegisterService } from './../../services/register.service';
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
  name: string;
  email:string;
  password:string;
  confirmPassword:string;
  address:string;
  phone: string;
  private credentials;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { 
    this.rForm = fb.group({
      'fullName': [null, Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      'phone':[null, Validators.required],
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

  onSubmit(form){
    this.name = form.fullName;
    this.password = form.password;
    this.email = form.email;
    this.address = form.address;
    this.phone = form.phone;
    
    this.credentials = {
      email: this.email,
      password: this.password,
      name: this.name,
      address: this.address,
      phone: this.phone
    }

    this.registerService.register(this.credentials).subscribe( 
      // We're assuming the response will be an object
      // with the JWT on an id_token key
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }
}
