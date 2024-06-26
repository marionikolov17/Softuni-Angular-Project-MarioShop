import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from '../shop/user.service';

@Injectable({ providedIn: 'root' })
export class GuestActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return new Promise(async (resolve) => {
      await this.userService.checkIsLoggedIn()
      if (this.userService.user) {
        this.router.navigate(['/shop']);
        resolve(false);
      } else {
        resolve(true)
      }
    })
  }
}
