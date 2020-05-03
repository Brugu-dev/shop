import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user$: Observable<firebase.User>;
	// appUser : AppUser;
  appUser$: Observable<AppUser>;
  isLogin = false;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
  	           private userService: UserService ) {
  	this.user$ = afAuth.authState;
  	this.user$.subscribe(user => {
  		if (user) {
        this.appUser$ = userService.get(user.uid);
        this.isLogin = true;
  			// userService.get(user.uid).subscribe(user=> this.appUser= user);
  		}
  	});
  }

  login() {
  	const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  	localStorage.setItem('returnUrl', returnUrl);
	  this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   this.isLogin = true;
  }

   logout() {
     this.isLogin = false;
  	  this.afAuth.signOut();
  }

}
