import { Products } from './../../Entities/Products.entities';
import { ProductsService } from './../../services/products.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  isEmpty: boolean = false;
  others: Products[];

  constructor(private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    var param = "OTHERS";
    this.productsservice.getProducts(param).subscribe((others)=>{
      this.others = others;
      this.others = others;
      this.isEmpty = this.others == null || this.others.length ==0;
    })
  }

  addToCart(others) {
    this.cartService.addToCart(others,1);
  }
}
