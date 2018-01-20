import { RequestStock } from './../../Entities/reqStock.entities';
import { Component, OnInit } from '@angular/core';
import { RequestStockService } from '../../services/request-stock.service';

@Component({
  selector: 'app-view-stock-requests',
  templateUrl: './view-stock-requests.component.html',
  styleUrls: ['./view-stock-requests.component.css']
})
export class ViewStockRequestsComponent implements OnInit {

  requestedStock: RequestStock[];

  constructor(private requestStock: RequestStockService) { }

  ngOnInit() {
    this.requestStock.getStockRequests().subscribe((requestedStock)=>{
      this.requestedStock = requestedStock;
    })
  }

}
