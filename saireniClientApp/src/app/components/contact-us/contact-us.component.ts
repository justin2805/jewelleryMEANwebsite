import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  rForm: FormGroup;
  form:any;
  name:string;
  email:string;
  mobileNumber:number;
  subject:string;
  message:string;
  
  constructor(private fb: FormBuilder) { 
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      'mobileNumber': [null, Validators.required],
      'subject':[null],
      'message': [null, Validators.required]
    })
  }

  ngOnInit() {
     
  }

  log(x) {console.log(x);}
  

  onSubmit(form){
    this.name = form.name;
    this.email = form.email;
    this.mobileNumber = form.mobileNumber;
    this.subject = form.subject;
    this.message = form.message;
  }
}
