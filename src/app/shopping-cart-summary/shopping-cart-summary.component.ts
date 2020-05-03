import { Component, OnInit, Input } from '@angular/core';
import { Item } from './../models/item';
import { Cart } from './../models/cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  @Input('cart') cart: Cart;
  quantityCount: number;
  totalPrice: number ;
  constructor() { }

  ngOnInit(): void {
  	this.quantityCount = this.cart.quantityCount;
  	this.totalPrice = this.cart.totalPrice;
  }

}
