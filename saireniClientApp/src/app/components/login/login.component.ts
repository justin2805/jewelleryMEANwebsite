import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../Utils/password.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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
  private successMessage: string = '';
  private errorMessage: string = '';

  constructor(private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router) { 
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
    localStorage.setItem('saireni_user_type', "");
    localStorage.setItem('saireni_user_name',"");
    localStorage.setItem('saireni_user_phone',"");
    localStorage.setItem('saireni_user_email',"");
    localStorage.setItem('saireni_user_address',"");
    
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
        localStorage.setItem('saireni_user_type', data.usertype);
        localStorage.setItem('saireni_user_name',data.name);
        localStorage.setItem('saireni_user_phone',data.phone);
        localStorage.setItem('saireni_user_email',data.email);
        localStorage.setItem('saireni_user_address',data.address);
        this.rForm.reset();
        this.successMessage = "Login Successful";
        this.errorMessage = "";
        window.location.reload();
        this.router.navigate(['']);
      },
      error => {
        this.successMessage = "";
        this.errorMessage = "Login Unsuccessfull";
        console.log(error);
      }
    );  
  }
}
