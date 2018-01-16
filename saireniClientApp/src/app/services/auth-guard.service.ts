import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  canActivate() {
    if(this.login.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false
    }
   }

}
