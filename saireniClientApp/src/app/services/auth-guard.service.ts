import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  canActivate() {
    if(this.login.loggedIn()) {
      if(this.login.isAdmin()) {
        console.log('11')
        return true;
      } else {
        console.log('12');
        this.router.navigateByUrl('/unauthorized');
        return false;
      }
    } else {
      console.log('13')
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
   }

}
