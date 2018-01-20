import { ContactUsService } from './../../services/contact-us.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contacts } from '../../Entities/contact.entities';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  rForm: FormGroup;
  form:any;
  body: Contacts = new Contacts();
  
  constructor(private fb: FormBuilder, private contactsService: ContactUsService) { 
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
    this.body.name = form.name;
    this.body.email = form.email;
    this.body.mobileNo = form.mobileNumber;
    this.body.subject = form.subject;
    this.body.message = form.message;
    this.contactsService.uploadContact(this.body).subscribe((res)=>{
      console.log(res)
      this.rForm.reset();
    })
  }
}
