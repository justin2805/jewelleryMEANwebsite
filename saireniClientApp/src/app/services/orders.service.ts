import { Orders } from './../Entities/order.entities';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class OrdersService {

  constructor(private http: Http) {
    console.log("service of prod connected")
   }

   getAllOrders(){
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
    // headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
    console.log(opts)
     return this.http.get('http://192.168.1.103:3001/cart',opts).map(res => res.json());

  // let params1 = new HttpParams();
  // params1.set("productType",productType);
  // return this.http.get<Products[]>('http://192.168.1.103:3001/products', 
  //         {params:params1}).map(res => res);
   }

   getSingleOrder(orderId: number){
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
   //  headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
   //  console.log(opts)
     return this.http.get(`http://192.168.1.103:3001/cart/${orderId}`,opts)
     .map(res => res.json());
   }

   placeOrder(body:Orders) {
     let headers = new Headers();
     headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
    //  headers.append('Content-Type','multipart/form-data');
     let opts = new RequestOptions({headers:headers});
    //  console.log(opts)
     return this.http.post('http://192.168.1.103:3001/cart',body,opts).map(res=> res.json());
   }

   updateOrder(body, orderId: number) {
    let headers = new Headers();
    headers.append('Authorization','JWT '+localStorage.getItem('id_token'));
   //  headers.append('Content-Type','multipart/form-data');
    let opts = new RequestOptions({headers:headers});
   //  console.log(opts)
    return this.http.put(`http://192.168.1.103:3001/cart/${orderId}`,body,opts).map(res=> res.json());
  }

}
