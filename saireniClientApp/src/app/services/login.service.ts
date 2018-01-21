import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post('http://192.168.1.103:3001/sign_in', credentials).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  isAdmin() {
    const isAdmin = localStorage.getItem('saireni_isAdmin');
    if (isAdmin == null) {
      return false;
    }
    return isAdmin == "ADMIN";
  }
}
