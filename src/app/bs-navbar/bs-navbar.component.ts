import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Cart } from './../models/cart';
import { Item } from './../models/item';
import { AppUser } from './../models/app-user';
import { Router } from '@angular/router';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy{

	subscription: Subscription;
	cart: Cart;
	showItemQuatity: number;
	// appUser : AppUser;
  constructor(public auth: AuthService,
  			         private cartService: ShoppingCartService,
  			         private router: Router) {
  }

  logout() {
  	this.auth.logout();
  	this.router.navigate(['/products']);
  }

  async ngOnInit() {

  	this.subscription = (await this.cartService.getCart())
  								.subscribe(itemArray => {
  									this.cart = new Cart(itemArray);
  									this.showItemQuatity = this.cart.quantityCount;
  								});
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }
}
