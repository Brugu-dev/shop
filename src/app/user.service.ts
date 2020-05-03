import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { AuthService } from './auth.service';
import { empty, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) { }

  save(user: firebase.User) {

  	this.getUser(user).subscribe(result => {
  		if (!result){
  			this.firestore.collection('users').doc(user.uid).set({
  			name: user.displayName,
  			email: user.email,
  			isAdmin: false
 		 	});
  		}
  	});
  }

  get(uid: string): Observable<AppUser> {
  	return this.firestore.collection('users')
  		   .doc<AppUser>(uid).snapshotChanges()
  		   .pipe(map(doc => {
                 if (doc.payload.exists) {
                    const data = doc.payload.data() as AppUser;
                    const id = doc.payload.id;
                    return {id, ...data};
                   }
            }));
  }

  getUser(user): Observable<boolean> {
  return  this.firestore.collection('users')
  		   .doc<AppUser>(user.uid).snapshotChanges()
  		   .pipe(map(doc => {
                if (doc.payload.exists) {
                    return true;
                }else {
                	return false;
                }
            }));
  }
}
