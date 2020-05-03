import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Order } from './models/order';
import { Item } from './models/item';
import { Cart } from './models/cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore,
  				        private cartService: ShoppingCartService) { }

  async placeOrder(order) {
 	const result = await this.firestore.collection('orders').add(order);
 	this.cartService.clearCart();
 	return result;

  }

   getOrders() {
    return this.firestore.collection<Order>('orders')
  				.snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as Order;
            const id = action.payload.doc.id;
            return { id, ...data };
        });
    }));
  }


	getOrderById(orderId) {
		return this.firestore.collection<Order>('orders')
					.doc<Order>(orderId).snapshotChanges().pipe(map(doc => {
						if (doc.payload.exists) {
                   		 const data = doc.payload.data() as Order;
                    		return data;
                   }
					}));
	}
}
