import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Order } from './../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  firebaseUserId;
  orderItems: Order[];
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
  	 this.authService.user$.subscribe(u => {
					this.orderService.getOrders().subscribe(orders => {
     		this.orderItems = orders.filter(o => (o.userId == u.uid));
     });
    });
  }
}
