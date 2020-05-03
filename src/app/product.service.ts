import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  create(product){
  	return this.firestore.collection('products').add(product);
  }

  getAll() {
  	return this.firestore.collection<Product>('products')
  	   .snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            const id = action.payload.doc.id;
            return { id, ...data };
        });
    }));
  }

  getProduct(productId): Observable<Product> {
  return this.firestore.collection('products')
  		   .doc<Product>(productId).snapshotChanges()
  		   .pipe(map(doc => {
                // Only if the entity exists should we build an object out of it
                 if (doc.payload.exists) {
                    const data = doc.payload.data() as Product;
                    return data;
                   }
            }));
  }

  update(productId, product){
  	return this.firestore.doc('products/' + productId).update(product);
  }

  delete(productId) {
  	return this.firestore.doc('products/' + productId).delete();
  }
}
