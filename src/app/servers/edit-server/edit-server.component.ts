import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Loading params from snapshot
    // console.log(`queryParams: ${this.route.snapshot.queryParams}`);
    // Loading fragment from snapshot
    // console.log(`fragment: ${this.route.snapshot.fragment}`);

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params
      .subscribe(
        (params) => {
          console.log('id ', params['id']);
          if (params['id'] !== undefined) {
            this.server = this.serversService.getServer(parseInt(params['id']));
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
  }

}
