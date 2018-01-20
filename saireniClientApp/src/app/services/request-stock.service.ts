import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestStockService {

  constructor(private http: Http) {
    console.log("service of reqStock connected")
   }

   getStockRequests(){
    return this.http.get('http://192.168.1.103:3001/reqStock').map(res => res.json());
  }

  uploadStockRequest(body) {
    return this.http.post('http://192.168.1.103:3001/reqStock', body).map(res =>res.json());
  }

}

