import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../product.service';
import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
/*import { DataTableResource } from 'angular-4-data-table-bootstrap-4';*/

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

	products: Product[];
	subscription: Subscription;
	filteredProducts: Product[];
	// tableResources: DataTableResource<Product>;
	items: Product[] = [];
	itemCount: number;
   config: any;

  constructor(private productService: ProductService) {
  	this.subscription = this.productService.getAll()
  							.subscribe(products => {
  								this.filteredProducts = this.products = products;
  								this.intializeTable(this.filteredProducts);

  							});

  }

private intializeTable( filteredProducts ){
              this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.filteredProducts.length
    };
}
  /*private intializeTable(products: Product[]){
  	this.tableResources = new DataTableResource(products);
  	this.tableResources.query({ offset:0 })
  		 .then(items => this.items = items);
  	this.tableResources.count()
  		 .then(count => this.itemCount = count);
  }*/

 /* reloadItems(params) {
  	if(!this.tableResources) return;

  	this.tableResources.query(params)
  		.then(items => this.items = items);
  }*/

  ngOnInit(): void {
  }

  filter(query: string) {
  	this.filteredProducts = (query) ?
  	  	this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  	  	this.products;

  // 	this.intializeTable(filteredProducts);
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

    pageChanged(event){
    this.config.currentPage = event;
  }
}
