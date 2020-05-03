import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService} from './auth.service';
import { UserService} from './user.service';
import { map } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
  	let isAdmin = false;
   this.auth.user$.subscribe(user => {
       this.userService.get(user.uid).subscribe(appUser => {
         isAdmin = appUser.isAdmin;
       });
    });
  	return isAdmin;
  }
}
