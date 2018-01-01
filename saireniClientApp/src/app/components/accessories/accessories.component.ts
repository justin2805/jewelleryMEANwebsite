import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  accessories: Products[];
  isEmpty: boolean = false;

  constructor(private productsservice: ProductsService) {
    console.log("Products service init")
   }

  ngOnInit() {
    var param = "ACCESSORIES";
    this.productsservice.getProducts(param).subscribe((accessories)=>{
      console.log(accessories);
      this.accessories = accessories;
      this.isEmpty = this.accessories == null || this.accessories.length ==0;
    })
  }

}
