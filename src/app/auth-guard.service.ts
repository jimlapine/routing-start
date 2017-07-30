import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }
  /*
    Either returns a observable or a promise or a boolean
    Can run asynchronously or synchronously
  */
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          // can route be activated, if so return true.
          if (authenticated) {
            return true;
          } else {
            // If route can not be activated, navigate to home page
            this.router.navigate(['AccessDenied']);
          }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
  }
}
