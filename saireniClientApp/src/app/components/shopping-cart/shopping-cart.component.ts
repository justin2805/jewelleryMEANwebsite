import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Products } from './../../Entities/Products.entities';
import { Item } from './../../Entities/item.entities';
import { ProductsService } from './../../services/products.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCartItems$: Observable<Products[]> = of([]);
  public shoppingCartItems: Products[] = [];
  products: Products[];

  constructor(private cartService: CartService) {
    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
   }

  ngOnInit() {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_value => {
      this.products = _value;
    });
  }

  removeFromCart(product: Products) {
    this.cartService.removeFromCart(product);
  }

  prodQtyChanged(product: Products, prodQtyValue: number) {
    console.log("JUSTINOS:: v    "+product.quantity + "    "+prodQtyValue);
      this.cartService.updateQuantityFromCart(product, prodQtyValue);
  }

  reduceProdQuantity(product: Products, prodQtyValue: number) {
    this.cartService.updateQuantityFromCart(product, prodQtyValue);
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
