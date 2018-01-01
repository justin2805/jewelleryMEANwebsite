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

  constructor(private productsservice: ProductsService) {
    console.log("Products service init")
   }

  ngOnInit() {
    var param = "JEWELLERY";
    this.productsservice.getProducts(param).subscribe((jewelleries)=>{
      console.log(jewelleries);
      this.jewelleries = jewelleries;
      this.jewelleries = jewelleries;
      this.isEmpty = this.jewelleries == null || this.jewelleries.length ==0;
    })
  }

}
