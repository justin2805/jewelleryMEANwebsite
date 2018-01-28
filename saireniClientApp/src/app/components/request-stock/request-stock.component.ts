import { ActivatedRoute } from '@angular/router';
import { RequestStock } from './../../Entities/reqStock.entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestStockService } from '../../services/request-stock.service';
import { VALID } from '@angular/forms/src/model';

@Component({
  selector: 'app-request-stock',
  templateUrl: './request-stock.component.html',
  styleUrls: ['./request-stock.component.css']
})
export class RequestStockComponent implements OnInit {
  
  rForm: FormGroup;
  form:any;
  body: RequestStock = new RequestStock();
  id: number;
  name: string;
  private user_phone: string;
  private user_email: string;
  private user_name: string;
  private successMsg: string;
  private errorMsg: string;

  constructor(private fb: FormBuilder, private reqService : RequestStockService, private route: ActivatedRoute) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      'mobileNumber': [null, Validators.required],
      'subject':[null],
      'message': [null],
      'productQtReqd': [null, Validators.required],
      'productId': [null],
      'productName': [null]
    })

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('productId');
      this.name = params.get('name');
      this.user_email = localStorage.getItem('saireni_user_email');
      this.user_name = localStorage.getItem('saireni_user_name');
      this.user_phone = localStorage.getItem('saireni_user_phone');
      this.rForm.controls['name'].setValue(this.user_name);
      this.rForm.controls['email'].setValue(this.user_email);
      this.rForm.controls['mobileNumber'].setValue(this.user_phone);

      console.log(params)
      console.log(this.id)
      console.log(this.name);
    })
   }

  ngOnInit() {
  }

  onSubmit(form){
    this.body.name = form.name;
    this.body.email = form.email;
    this.body.mobileNo = form.mobileNumber;
    this.body.subject = form.subject;
    this.body.message = form.message;
    this.body.prod_qty = form.productQtReqd;
    this.body.prod_id = this.id;
    this.body.prod_name = this.name;

    this.reqService.uploadStockRequest(this.body).subscribe(
      (res)=>{
      console.log(res);
      this.successMsg = "Your request has been sent for approval. We'll email you in event of further updates.";
      this.errorMsg = "";
      this.rForm.reset();
    }, (err)=> {
      this.successMsg = "";
      this.errorMsg = "We could not process your request due to some technical issues. Please try again";
      console.log(err)
    })
  }
}
