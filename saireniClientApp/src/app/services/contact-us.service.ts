import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactUsService {

  constructor(private http: Http) {
    console.log("service of contactus connected")
   }

   getContacts(){
     return this.http.get('http://192.168.1.103:3001/contactus').map(res => res.json());
   }

   uploadContact(body) {
     return this.http.post('http://192.168.1.103:3001/contactus', body).map(res =>res.json());
   }

}
