import { Item } from './item';

export class Cart {
	id: string;
	dateCreated: number;
	// items : Item[];
	quantityCount: number;
	totalPrice = 0;

	constructor(public items: Item[]) {
		this.quantityCount = 0;
		for (let i = 0; i < this.items.length; i++){
        this.quantityCount += this.items[i].quantity;
        const price = this.items[i].product.price * this.items[i].quantity;
        this.items[i].totalProductPrice = this.items[i].product.price * this.items[i].quantity;
        this.totalPrice += price;
    	}
	}
}
