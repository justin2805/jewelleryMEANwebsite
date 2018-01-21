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
  
  constructor(private fb: FormBuilder, private loginService: LoginService) { 
    this.rForm = fb.group({
      'email': [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
     
  }
  

  onSubmit(form){
    localStorage.setItem('id_token', "");
    localStorage.setItem('saireni_isAdmin', "");
    
    this.email = form.email;
    this.password = form.password;
    this.credentials = {
      email: this.email,
      password: this.password
    }

    this.loginService.login(this.credentials).subscribe( 
      // We're assuming the response will be an object
      // with the JWT on an id_token key
      data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('saireni_isAdmin', data.usertype);
        this.rForm.reset();
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );  
  }
}
