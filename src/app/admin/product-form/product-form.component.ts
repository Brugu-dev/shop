import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { Category } from './../../models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../models/product';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

public categories: Observable<Category[]>;
public product: Product;
public productSubscribe ;
public id;

  constructor( private categoryService: CategoryService,
  			          private productService: ProductService,
  			          private router: Router,
  			          private route: ActivatedRoute) {
  	this.assignProduct();
  	this.categories = categoryService.getCategories();

  	this.id = this.route.snapshot.paramMap.get('id');
  	if (this.id) {
  	 this.productService.getProduct(this.id)
  			.pipe(take(1)).subscribe(p => this.product = p);
  		}
   }

 save(product) {
 	if (this.id){
 		this.productService.update(this.id, product);
 	}else {
 		this.productService.create(product);
 	}

 	this.router.navigate(['/admin/products']);

 }
  ngOnInit(): void {
  }

assignProduct() {
	this.product = {
  		category: '',
  		imageUrl: '',
  		price: null,
  		title: '',
  		id: ''
  	};
}

delete() {
	if (!confirm('Are you sure you want to delete this product?')) { return; }
	this.productService.delete(this.id);
	this.router.navigate(['/admin/products']);
	}
}
