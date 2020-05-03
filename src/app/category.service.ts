import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
import { Category } from './models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase ) {
  }

 	getCategories() {
  	return this.firestore.collection<Category>('categories', ref => ref.orderBy('name'))
  				.snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as Category;
            const id = action.payload.doc.id;
            return { id, ...data };
        });
    }));
  }
}
