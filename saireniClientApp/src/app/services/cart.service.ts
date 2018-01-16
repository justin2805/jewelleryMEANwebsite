import { Products } from './../Entities/Products.entities';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Products[]> = new BehaviorSubject([]);
  private itemInCart: Products[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemInCart = _);
  }

  public addToCart(item: Products, prodQtyValue: number) {
    // if array contains the product, update the product quantity
    var itemIsPresentInCart: boolean = false;
    var index: number;
    for (var i = 0; i < this.itemInCart.length; i++) {
      if (this.itemInCart[i].productId === item.productId) {
        itemIsPresentInCart = true;
        index = i;
      }
    }
    if (itemIsPresentInCart) {
      if (index !== -1) {
        this.itemInCart[index].quantity = this.itemInCart[index].quantity + prodQtyValue;
        console.log("JUSTIN::: Add to cart:: quant of obj at index: " + index + " :updated to " + this.itemInCart[index].quantity);
      }
    } else {
      // else add the new product object to the array
      console.log("JUSTIN::: Add to cart:: New prod obj added to cart");
      item.quantity = 1;
      this.itemInCart.push(item);
    }
    itemIsPresentInCart = false;
    // this.itemsInCartSubject.next([...this.itemInCart, item]);
  }

  public getItems(): Observable<Products[]> {
    return this.itemsInCartSubject;
  }

  public getNoOfItems(): Observable<number> {
    var noOfItems;
    for(var i = 0; i < this.itemInCart.length; i++ ) {
      noOfItems = noOfItems + this.itemInCart[i].quantity;
    }
    return noOfItems;
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: Products[]) => {
      return items.reduce((prev, curr: Products) => {
        return prev + curr.cost;
      }, 0);
    });
  }

  public removeFromCart(item: Products) {
    var index: number;
    for (var i = 0; i < this.itemInCart.length; i++) {
      if (this.itemInCart[i].productId === item.productId) {
        index = i;
      }
    }
    if (this.itemInCart.includes(item)) {
      console.log("JUSTIN::: removeFromCart:: obj at index: " + index + " :removed from cart");
      this.itemInCart.splice(index, 1);
    }
    // const currentItems = [...this.itemInCart];
    // const itemsWithoutRemoved = currentItems.filter(_ => _.productId !== item.productId);
    // this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public updateQuantityFromCart(item: Products, quantity: number) {
    var index: number;
    var itemIsPresentInCart: boolean;
    for (var i = 0; i < this.itemInCart.length; i++) {
      if (this.itemInCart[i].productId === item.productId) {
        index = i;
        itemIsPresentInCart = true;
      }
    }
    if (itemIsPresentInCart) {
      const prodQuantity: number = this.itemInCart[index].quantity;
      // console.log(this.itemInCart[index]);
      // this.itemInCart[index].quantity = this.itemInCart[index].quantity - quantity;

      this.itemInCart[index].quantity = quantity;
      console.log("JUSTIN::: removeFromCart:: quant of obj at index: " + index + " :updated to " + this.itemInCart[index].quantity);

      // else {
      //   // why does this return the index of position clicked
      //   // console.log("JUSTIN:::"+index);
      //   console.log("JUSTIN::: removeFromCart:: obj at index: " + index + " :removed from cart");
      //   this.itemInCart.splice(index, 1);
      // }
    }
    // const currentItems = [...this.itemInCart];
    // const itemsWithoutRemoved = currentItems.filter(_ => _.productId !== item.productId);
    // this.itemsInCartSubject.next(itemsWithoutRemoved);
  }
}
