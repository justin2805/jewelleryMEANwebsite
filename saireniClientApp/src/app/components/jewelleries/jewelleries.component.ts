import { CartService } from './../../services/cart.service';
import { Products } from './../../Entities/Products.entities';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jewelleries',
  templateUrl: './jewelleries.component.html',
  styleUrls: ['./jewelleries.component.css']
})
export class JewelleriesComponent implements OnInit {

  jewelleries: Products[];
  isEmpty: boolean = false;

  constructor(private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    var param = "JEWELLERY";
    this.productsservice.getProducts(param).subscribe((jewelleries)=>{
      this.jewelleries = jewelleries;
      this.jewelleries = jewelleries;
      this.isEmpty = this.jewelleries == null || this.jewelleries.length ==0;
    })
  }

  addToCart(jewellery) {
    this.cartService.addToCart(jewellery,1);
  }

}
