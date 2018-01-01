import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
    console.log("service of prod connected")
   }

   getProducts(productType: String){
     return this.http.get('http://192.168.1.102:3001/products', {
       params:{
        productType : productType
       }
     }).map(res => res.json());
   }

}
