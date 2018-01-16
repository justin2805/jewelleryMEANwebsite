import { Products } from './../../Entities/Products.entities';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-mobile-cases',
  templateUrl: './mobile-cases.component.html',
  styleUrls: ['./mobile-cases.component.css']
})
export class MobileCasesComponent implements OnInit {
  isEmpty: boolean = false;
  mobileCases: Products[];

  constructor(private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    var param = "MOBILE CASE";
    this.productsservice.getProducts(param).subscribe((mobileCases)=>{
      this.mobileCases = mobileCases;
      this.mobileCases = mobileCases;
      this.isEmpty = this.mobileCases == null || this.mobileCases.length ==0;
    })
  }

  addToCart(mobileCases) {
    this.cartService.addToCart(mobileCases,1);
  }
}
