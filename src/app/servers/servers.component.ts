import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  // Inject service, inject router, inject active route
  constructor(private serversService: ServersService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  reloadPage() {
    /*
      router.navigate does not know where in route hierarchy  it is
      unless we specify relativeTo and supply active route
    */
    // this.router.navigate(['../servers'], { relativeTo: this.route });
    this.router.navigate(['/servers'], { relativeTo: this.route });
  }
}
