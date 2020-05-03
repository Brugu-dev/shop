import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Item } from './../models/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

@Input('product') product;
@Input('show-action') showAction = true;
@Input('shopping-cart') shoppingCart: Item[];

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
  	this.cartService.addToCart(this.product);
  }

   getQuantity() {
     let numberSelected = 0;
     if (!this.shoppingCart) {
       numberSelected = 0;
     } else {
        for (let i = 0; i < this.shoppingCart.length; i++) {
            if (this.shoppingCart[i].id === this.product.id) {
                    numberSelected = this.shoppingCart[i].quantity;
            }
          }
     }
     return numberSelected;
  }
}
