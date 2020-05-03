import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../order.service';
import { Order } from './../models/order';
import { OrderItem } from './../models/orderItem';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  order: Order;
  orderId: string;
  orderItem: OrderItem[] = [];
  constructor(
  			   private orderService: OrderService,
  			   private router: Router,
  			   private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.assignOrder();
  	this.orderId = this.route.snapshot.paramMap.get('id');
   this.orderService.getOrderById(this.orderId).subscribe(order => {
   		this.order = order;
   		console.log('order :' + order);
   		this.orderItem = order.orderItems;
   });
  }

  assignOrder(){
  	this.order = {
  		     datePlaced:  null,
  		     orderItems: [],
  		     shipping: null,
  		     userId: '',
  		     id: '',
  		     totalPrice : null
  	};
  }
}
