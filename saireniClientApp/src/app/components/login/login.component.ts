import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../Utils/password.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  rForm: FormGroup;
  form:any;
  email:string;
  password:string;
  private credentials;
  
  constructor(private fb: FormBuilder, private login: LoginService) { 
    this.rForm = fb.group({
      'email': [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
     
  }

  log(x) {console.log(x);}
  

  onSubmit(form){
    this.email = form.email;
    this.password = form.password;
    this.credentials = {
      email: this.email,
      password: this.password
    }

    console.log(this.credentials);
    this.login.login(this.credentials);
  }
}
