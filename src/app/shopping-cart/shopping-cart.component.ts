import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { Cart } from './../models/cart';
import { Subscription } from 'rxjs';
import { Item } from './../models/item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

	subscription: Subscription;
	cart: Cart;
	showItemQuatity: number;
	items: Item[];
	totalPrice: number;

  constructor(private cartService: ShoppingCartService) { }

   async ngOnInit() {

  	this.subscription = (await this.cartService.getCart())
  								.subscribe(itemArray => {
  									this.cart = new Cart(itemArray);
  									this.items = this.cart.items;
  									this.totalPrice = this.cart.totalPrice;
  									this.showItemQuatity = this.cart.quantityCount;
  								});
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

 clearCart() {
 	this.cartService.clearCart();
 }

}
