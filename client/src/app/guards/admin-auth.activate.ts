import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../admin/admin-auth.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthActivate implements CanActivate {
  constructor(private adminAuthService: AdminAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.adminAuthService.isAdminLoggedIn) {
      this.router.navigate(['/shop']);
      return false;
    }
    return this.adminAuthService.isAdminLoggedIn;
  }
}
