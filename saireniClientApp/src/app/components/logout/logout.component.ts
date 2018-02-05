import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('saireni_user_id') !== '') {
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['']);
    }
  }

  logout() {
    localStorage.setItem('id_token', "");
    localStorage.setItem('saireni_user_type', "");
    localStorage.setItem('saireni_user_name',"");
    localStorage.setItem('saireni_user_phone',"");
    localStorage.setItem('saireni_user_email',"");
    localStorage.setItem('saireni_user_address',"");
    localStorage.setItem('saireni_user_id',"");
    window.location.reload();
  }

}
