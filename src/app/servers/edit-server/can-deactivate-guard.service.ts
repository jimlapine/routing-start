import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  // This method can return any of these three specified below
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// Export sevice class with implments Routing CanDeactivate using our interface
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  /*
    Can detactivate will contain a component
    that has impletmented our CanComponentDeactivate interface
    The current Route
    The current Route state
    and an optional nextState (where we want to route to next)
  */
  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
  }
}
