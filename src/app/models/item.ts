import {Product } from './product';


export interface Item {
	product: Product;
	quantity: number;
	id: string;
	totalProductPrice: number;
}
