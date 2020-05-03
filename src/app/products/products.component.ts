import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product.service';
import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Cart } from './../models/cart';
import { Item } from './../models/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

	products: Product[] = [];
	filteredProducts: Product[] = [];
	categories$;
	category: string;
	cart: Item[];
	subscription: Subscription;

  constructor(private productService: ProductService,
  			         private route: ActivatedRoute,
  			         private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
  	this.subscription = (await this.cartService.getCart())
  								.subscribe(cart => this.cart = cart);
  	this.populateProducts();
  }

  private populateProducts() {
  	this.productService.getAll().pipe(switchMap(products => {
  	 		this.products = products;
  	 		return this.route.queryParamMap;
  	 	})).subscribe(params => {
    			this.category = params.get('category');
    			this.applyFilter();
  			});
  }

  private applyFilter() {
  		this.filteredProducts = (this.category) ?
    						this.products.filter(p => (p.category === this.category)) :
    						this.products;
  }
  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }
}
