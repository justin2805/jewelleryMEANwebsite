import { Products } from './../../Entities/Products.entities';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  accessories: Products[];
  isEmpty: boolean = false;

  constructor(private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    var param = "ACCESSORIES";
    this.productsservice.getProducts(param).subscribe((accessories)=>{
      this.accessories = accessories;
      this.accessories = accessories;
      this.isEmpty = this.accessories == null || this.accessories.length ==0;
    })
  }

  addToCart(accessory) {
    this.cartService.addToCart(accessory,1);
  }

}
