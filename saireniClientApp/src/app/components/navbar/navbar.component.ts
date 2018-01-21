import { CartService } from './../../services/cart.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../Entities/Products.entities';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private itemsQuantity: number = null;
  public shoppingCartItems$: Observable<Products[]> = of([]);
  public shoppingCartItems: Products[] = [];
  private isAdmin: boolean = false;

  constructor(private cartService: CartService, private loginsService: LoginService) {
    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => {
      this.shoppingCartItems = _;
      console.log(this.shoppingCartItems)
    });
   }

  ngOnInit() {
    this.isAdmin = this.loginsService.isAdmin();


    // this.shoppingCartItems$ = this.cartService.getItems();
    // // _value is parameter in this.shoppingCartItems$ obj
    // // params include - _isScalar,_value -Array[], closed, hasError, isStopped, observers, thrownerror,etc
    // this.shoppingCartItems$.subscribe(_ => {
    //   console.log(_);
    //   console.log("ItemQty : "+this.shoppingCartItems)
    //   if (this.itemsQuantity == 0) {
    //     this.itemsQuantity = null;
    //   }
    // });
  }

}
