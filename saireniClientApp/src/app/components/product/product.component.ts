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
  private isAdmin: boolean;
  private successMsg: string ='';
  private errorMsg: string ='';

  constructor(private route: ActivatedRoute, private productsservice: ProductsService, 
    private cartService: CartService) {
   }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('saireni_user_type') === "ADMIN";
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

  delete() {
    this.productsservice.deleteProducts(this.id).subscribe(
      (res) => {
        console.log(res)
        this.successMsg = "Product delete Successful!";
        this.errorMsg = "";
        // this.rForm.reset();
      }, (err) => {
        this.successMsg = "";
        this.errorMsg = "Product delete Unsuccessful. Please try again later!";
        console.log(err);
      })
  }
}
