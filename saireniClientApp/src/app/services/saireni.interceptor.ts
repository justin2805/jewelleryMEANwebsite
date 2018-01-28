import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class SaireniAuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
        'Authorization': 'JWT '+localStorage.getItem('id_token'),
        'Content-Type': 'multipart/formdata'
      });
  
  
      const cloneReq = req.clone({headers});
    
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', 'JWT '+localStorage.getItem('id_token'))
    // });
    return next.handle(cloneReq);
  }
}