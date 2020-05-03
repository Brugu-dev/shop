import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { Cart } from './../models/cart';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  cartSubscription: Subscription;
  cart: Cart;

  constructor( private cartService: ShoppingCartService) {}

   async ngOnInit() {

  	this.cartSubscription = (await this.cartService.getCart())
  								.subscribe(itemArray => {
  									this.cart = new Cart(itemArray);
  								});
  }

  ngOnDestroy() {
  	this.cartSubscription.unsubscribe();
  }
}
