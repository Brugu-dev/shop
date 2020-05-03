import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Item } from './../models/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

@Input('product') product;
@Input('shopping-cart') shoppingCart: Item[];
@Input('quantity') quantity;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
  	this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

   getQuantity() {
     let numberSelected = 0;
     if (this.quantity) {
     	numberSelected = this.quantity;
     } else {
     if (!this.shoppingCart) {
       numberSelected = 0;
     } else {
        for (let i = 0; i < this.shoppingCart.length; i++) {
            if (this.shoppingCart[i].id === this.product.id) {
                    numberSelected = this.shoppingCart[i].quantity;
            }
          }
     }
	 }
     return numberSelected;
  }

}
