import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Orders, OrderArray } from './../../Entities/order.entities';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Orders = new Orders();
  orderArray: OrderArray[] = [];
  isAdmin: boolean;
  id: number;
  rForm: FormGroup;
  errorMsg:string;
  successMsg:string;
  g_order_status:string;

  constructor(private route: ActivatedRoute,
    private orderService: OrdersService,
    private fb: FormBuilder) {
    this.rForm = fb.group({
      'order_status': [null],
      'ref_no':[null],
      'comments':[null]
    })
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('saireni_user_type') === "ADMIN";
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('orderId');
      console.log(this.id)
    })
    var userType: string = localStorage.getItem('saireni_user_type');
    this.orderService.getSingleOrder(this.id).subscribe((order) => {
      this.order = order;
      this.g_order_status = this.order.order_status;
      for (var i = 0; i < this.order.order.length; i++) {
        if (this.order !== null && this.order.order[i] !== null) {
          this.orderArray.push(this.order.order[i]);
        }
      }
    })
  }
  orderStatusChanged(status:string) {
    this.g_order_status = status;
  }

  createRange() {
    var items: string[] = ['ORDER_RECEIVED', 'PAYMENT_PROCESSING','PAYMENT_RECEIVED',
    'ORDER_PROCESSING','DELIVERY_IN_PROGRESS', 'PAYMENT_NOT_RECEIVED',
    'ORDER_DELIVERED','ORDER_CANCELLED','ORDER_FAILED','NO_PROGRESS'];
    return items;
  }

  onSubmit(form) {
    this.errorMsg = "";
    let ref_no: string = form.ref_no;
    let comments: string = form.comments;
    if(this.isAdmin) {
      if ((this.g_order_status === null || this.g_order_status === '' || 
      this.g_order_status === this.order.order_status) &&
       (form.comments === null || form.comments === '')) {
        this.errorMsg = "Please enter/select some data to proceed."
       } else {
         let body: any;
         if (comments === null || comments === '') {
           comments = this.order.order_comments;
         }
         body = {
          "order_status" : this.g_order_status,
          "order_comments": comments
         }
         this.orderService.updateOrder(body,this.id).subscribe((res) => {
          this.successMsg = "Your change has been submitted!";
          this.errorMsg = "";
          this.rForm.reset();
        }, (err) => {
          this.successMsg = "";
          this.errorMsg = "Something went wrong. Please try again!";
          console.log(err);
        });
       }
    } else {
      if (form.ref_no === null || form.ref_no === '') {
        this.errorMsg = "Please enter some data to proceed."
      } else {
        let body = {
          payment_reference_no : ref_no,
        }
        this.orderService.updateOrder(body,this.id).subscribe((res) => {
          this.successMsg = "Your change has been submitted!";
          this.errorMsg = "";
          this.rForm.reset();
        }, (err) => {
          this.successMsg = "";
          this.errorMsg = "Something went wrong. Please try again!";
          console.log(err);
        })
      }
    }
  }

}