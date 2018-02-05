import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  orders;
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    var userType: string = localStorage.getItem('saireni_user_type');
    this.orderService.getAllOrders().subscribe((orders)=>{
      this.orders = orders;
    })
  }

}

