import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(credentials) {
    this.http.post('http://192.168.1.103:3001/sign_in', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {
          localStorage.setItem('id_token', data.token);
        },
        error => {
          console.log(error);
        }
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
