import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  isEmpty: boolean = false;
  others: Products[];

  constructor(private productsservice: ProductsService) {
    console.log("Products service init")
   }

  ngOnInit() {
    var param = "OTHERS";
    this.productsservice.getProducts(param).subscribe((others)=>{
      this.others = others;
      this.others = others;
      this.isEmpty = this.others == null || this.others.length ==0;
    })
  }
}
