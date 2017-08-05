import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // We can subscribe to route data changes since it's an observable
    this.route.data
      .subscribe(
        (data: Data) => {
          // This name must match the name we gave this data property in app routing module
          this.server = data['server'];
        }
      );

    // + converts the params from a string to a number
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params) => {
    //       if (params['id'] !== undefined) {
    //         this.server = this.serversService.getServer(+params['id']);
    //       }
    //     }
    //   );

    this.route.queryParams.subscribe(
      (params) => {
        // console.log(`queryParams updated: ${params['allowEdit']}`);
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );
  }

  onEdit() {
    // // All we need to do is append the edit to the current path
    this.router
      .navigate(['edit'],
        {
          // My solution
          // queryParams: {allowEdit: this.allowEdit ? '1' : '0'},

          // Class solution, preserve the already present query paramenters
          queryParamsHandling: 'preserve',
          // If desired I can also add a fragment #value
          fragment: 'loading',
          relativeTo: this.route
      });

    // My first try with works as well
    // this.router.navigate([`/servers/${this.server.id}/edit`]);
  }
}
