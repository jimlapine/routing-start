import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/Router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';
import { Server } from '../server.model';

@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serverService: ServersService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server>
    | Promise<Server> | Server {
    return this.serverService.getServer(+route.params['id']);
  }
}
