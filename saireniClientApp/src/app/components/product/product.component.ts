import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../Entities/Products.entities';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Products = new Products();
  id: number;

  constructor(private route: ActivatedRoute, private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('productId');
      console.log(this.id)
    })
    this.productsservice.getSingleProduct(this.id).subscribe((product)=>{
      this.product = product;
      console.log(product);
    })
  }

  addToCart(product) {
    this.cartService.addToCart(product,1);
  }
}
