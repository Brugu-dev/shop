import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Product } from './models/product';
import { Item } from './models/item';
import { Cart } from './models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firestore: AngularFirestore) { }

  private create(){
  	return this.firestore.collection('shopping-carts').add({
  		dateCreated: new Date().getTime()
  	});
  }


async getCart(): Promise<Observable<Item[]>>{
	const cartId = await this.getOrCreateCartId();
	return this.firestore.collection('shopping-carts').doc(cartId)
  			.collection('items').snapshotChanges()
  			.pipe(map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as Item;
            const id = action.payload.doc.id;
            return { id, ...data };
        });
    }));
}

async getCartItems(productId) {
	const cartId = await this.getOrCreateCartId();

 return this.firestore.collection('shopping-carts').doc(cartId)
  			.collection('items').doc(productId).snapshotChanges().pipe(map(doc => {
                 if (doc.payload.exists) {
                    const data = doc.payload.data() as Item;
                    return data;
                   }
            }));

}
  private async getOrCreateCartId(): Promise<string> {

  	const cartId = localStorage.getItem('cartId');
  	if (cartId) { return cartId; }

  	const result = await this.create();
  	localStorage.setItem('cartId', result.id);
		 return result.id;
  }

  async addToCart(product: Product){
  	this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
  	this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
  	const cartId = await this.getOrCreateCartId();
  	const itemsRef = this.firestore.collection('shopping-carts').doc(cartId)
  								.collection('items').doc(product.id);
 	 itemsRef.snapshotChanges().pipe(take(1)).subscribe(item => {
  		if (item.payload.exists){
  			const data = item.payload.data() as Item;
  			itemsRef.update({quantity: data.quantity + change});
  		} else {
  			itemsRef.set({product, quantity: 1 });
  		}
  	});
  }

  async clearCart(){
 		const cartId = await this.getOrCreateCartId();
  	const qry: firebase.firestore.QuerySnapshot = await this.firestore.collection('shopping-carts')
  		 														.doc(cartId).collection('items').ref.get();
   qry.forEach(doc => {
    									  doc.ref.delete();
   								 });

  }
}
