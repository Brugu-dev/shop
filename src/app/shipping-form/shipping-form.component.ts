import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { Cart } from './../models/cart';
import { Subscription } from 'rxjs';
import { Item } from './../models/item';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Shipping } from './../models/shipping';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: Cart;
  shipping: Shipping;
  userSubscription: Subscription;
  userId: string;

  constructor(	private router: Router,
  				         private authService: AuthService,
  				         private orderService: OrderService ) {}

   ngOnInit() {
   	this.assignShipping();
  	 this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
  	this.userSubscription.unsubscribe();
  }

  placeOrder() {

  	const order = {
  		userId: this.userId,
  		datePlaced: new Date().getTime(),
  		shipping: this.shipping,
  		orderItems: this.cart.items.map(i => {
  			return {
  				product: {
  					title : i.product.title,
  					imageUrl: i.product.imageUrl,
  					price: i.product.price

  				},
  				quantity: i.quantity,
  				totalPrice: i.totalProductPrice
  			};
  		}),
      totalPrice: this.cart.totalPrice
  	};
   this.orderService.placeOrder(order).then(result => {
    		this.router.navigate(['/order-success', result.id]);
    });
  }

  assignShipping() {
  	this.shipping = { name: '',
			 		  addressLine1: '',
			          addressLine2: '',
			          city: '',
                pincode: null,
               mobile: null};
  }
}
