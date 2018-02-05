import { OrdersService } from './../../services/orders.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Products } from './../../Entities/Products.entities';
import { Item } from './../../Entities/item.entities';
import { ProductsService } from './../../services/products.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orders, OrderArray } from '../../Entities/order.entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCartItems$: Observable<Products[]> = of([]);
  public shoppingCartItems: Products[] = [];
  products: Products[];
  totalCost: number = 0;
  estimatedShippingCost: number = 0;
  order: Orders = new Orders();
  placeOrderClicked: boolean = false;
  name: string;
  phone: number;
  email: string;
  address: string;
  rForm: FormGroup;
  private successMsg:string;
  private errorMsg:string;

  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private ordersService : OrdersService,private router: Router) {
    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'phone': [null, Validators.required],
      'address': [null, Validators.required],
    })
  }

  ngOnInit() {
    console.log(localStorage.getItem('saireni_user_name'))
    this.rForm.controls['name'].setValue("asdasdsa");
    this.rForm.controls['email'].setValue(localStorage.getItem('saireni_user_email'));
    this.rForm.controls['address'].setValue(localStorage.getItem('saireni_user_address'));
    this.rForm.controls['phone'].setValue(localStorage.getItem('saireni_user_phone'));
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe(_value => {
      this.products = _value;
    });
    this.calculateTotalCartValue();
  }

  removeFromCart(product: Products) {
    this.cartService.removeFromCart(product);
  }

  prodQtyChanged(product: Products, prodQtyValue: number) {
    product.quantity = prodQtyValue;
    this.cartService.updateQuantityFromCart(product, prodQtyValue);
    this.calculateTotalCartValue();
  }

  reduceProdQuantity(product: Products, prodQtyValue: number) {
    this.cartService.updateQuantityFromCart(product, prodQtyValue);
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  calculateTotalCartValue() {
    var cartProds: Products[];
    this.shoppingCartItems$.subscribe(_value => {
      cartProds = _value;
    });
    this.totalCost = 0;
    for (var i = 0; i < cartProds.length; i++) {
      this.totalCost = this.totalCost + cartProds[i].cost * cartProds[i].quantity;
    }
  }


  placeOrder() {
    if (this.totalCost === 0) {
      console.log("Cart Empty")
    } else {
      this.placeOrderClicked = true;
      this.name = localStorage.getItem('saireni_user_name');
      this.email = localStorage.getItem('saireni_user_email');
      this.phone = +localStorage.getItem('saireni_user_phone');
      this.address = localStorage.getItem('saireni_user_address');
    }
  }

  onSubmit(form) {
    var cartProds: Products[];
    this.order.name = form.name;
    this.order.email = form.email;
    this.order.mobileNo = form.phone;
    this.order.address = form.address;
    this.order.userId = +localStorage.getItem('saireni_user_id');
    this.order.total_cost = this.totalCost;
    this.shoppingCartItems$.subscribe(_value => {
      cartProds = _value;
    });
    let orderArray: OrderArray[] = new Array(cartProds.length);
    for (var i = 0; i < cartProds.length; i++) {
      let orderArrayObj: OrderArray = new OrderArray();
      orderArrayObj.productId = cartProds[i].productId;
      orderArrayObj.prod_cost = cartProds[i].cost;
      orderArrayObj.prod_name = cartProds[i].name;
      orderArrayObj.prod_ordered_qty = cartProds[i].quantity;
      orderArrayObj.prod_cost_total = cartProds[i].cost * cartProds[i].quantity;
      orderArray.push(orderArrayObj);
    }
    this.order.order = orderArray;
    console.log("Place order for")
    console.log(this.order);    
    this.ordersService.placeOrder(this.order).subscribe(
      (res) => {
        this.successMsg = "Your order has been placed successfully!";
        this.errorMsg = "";
        this.rForm.reset();
        setTimeout(() => {
          this.router.navigate(['view_orders']);
        },
          5000);
      
      }, (err) => {
        this.successMsg = "";
        this.errorMsg = "Something went wrong. Please try again!";
        console.log(err);
      })
  }

}
