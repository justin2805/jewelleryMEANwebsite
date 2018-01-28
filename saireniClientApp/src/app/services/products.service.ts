import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from '../Entities/Products.entities';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
    console.log("service of prod connected")
   }

   getProducts(productType: string){
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
    headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
    console.log(opts)
     return this.http.get('http://192.168.1.103:3001/products', {
       params:{
        productType : productType
       }
     }).map(res => res.json());

  // let params1 = new HttpParams();
  // params1.set("productType",productType);
  // return this.http.get<Products[]>('http://192.168.1.103:3001/products', 
  //         {params:params1}).map(res => res);
   }

   getSingleProduct(productId: number){
     return this.http.get(`http://192.168.1.103:3001/products/${productId}`)
     .map(res => res.json());
   }

   uploadProducts(body:FormData) {
     let headers = new Headers();
     headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
    //  headers.append('Content-Type','multipart/form-data');
     let opts = new RequestOptions({headers:headers});
    //  console.log(opts)
     return this.http.post('http://192.168.1.103:3001/products',body,opts).map(res=> res.json());
   }

   updateProducts(body:FormData, productId: number) {
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
   //  headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
   //  console.log(opts)
    return this.http.put(`http://192.168.1.103:3001/products/${productId}`,body,opts).map(res=> res.json());
  }


  deleteProducts(productId: number) {
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
   //  headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
   //  console.log(opts)
    return this.http.delete(`http://192.168.1.103:3001/products/${productId}`,opts).map(res=> res.json());
  }

}
