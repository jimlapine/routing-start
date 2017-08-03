import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate, CanDeactivateGuard} from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

// Class implements our CanComponentDeactivate interface see CanDeactivate
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  // CanDeactivateGuard is configured in the app-routing.module and registered in the app.module
  constructor(private serversService: ServersService,
    private route: ActivatedRoute, private router: Router, private canDeactivateService: CanDeactivateGuard) {
  }

  ngOnInit() {
    // Loading params from snapshot
    // console.log(`queryParams: ${this.route.snapshot.queryParams}`);
    // Loading fragment from snapshot
    // console.log(`fragment: ${this.route.snapshot.fragment}`);

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params
      .subscribe(
        (params) => {
          console.log('id ', params['id']);
          if (params['id'] !== undefined) {
            this.server = this.serversService.getServer(parseInt(params['id'], 10));
            this.serverName = this.server.name;
            this.serverStatus = this.server.status;
            console.log('serverName ', this.serverName);
          }
        }
      );

    this.route.queryParams.subscribe(
      (params) => {
        // console.log(`queryParams updated: ${params['allowEdit']}`);
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );
    // We can subscribe to both the query parameter changes
    // this.route.queryParams.subscribe(
    //   (params) => {
    //     console.log(`queryParams updated: ${params}`);
    //   }
    // );

    // And we can subscribe to fragment changes
    // this.route.fragment.subscribe(
    //   (fragment) => {
    //     console.log(`fragment updated: ${fragment}`);
    //   }
    // );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    // Navigate up on level
    this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
  }

  // This method will determine if we can navigate away or not.
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // If you are not allow to edit this page you may leave
    if (!this.allowEdit) {
      return true;
    }

    // Check if server name has changed or status has changed and the changes have not been saved
    if (this.serverName !== this.server.name || this.serverStatus !== this.server.status && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }


}
