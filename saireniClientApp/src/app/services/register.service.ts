import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(credentials) {
    return this.http.post('http://192.168.1.103:3001/register', credentials).map(res => res.json());
  }

}
