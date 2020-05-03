import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Order[];

  constructor(private orderService: OrderService) {
    orderService.getOrders().subscribe(orders => {
    	this.orders = orders;
    });
  }
}
