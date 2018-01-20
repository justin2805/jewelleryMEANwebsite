import { ContactUsService } from './../../services/contact-us.service';
import { Contacts } from './../../Entities/contact.entities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-contact-entries',
  templateUrl: './view-contact-entries.component.html',
  styleUrls: ['./view-contact-entries.component.css']
})
export class ViewContactEntriesComponent implements OnInit {

  contacts: Contacts[];

  constructor(private contactsService: ContactUsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts)=>{
      this.contacts = contacts;
    })
  }

}



