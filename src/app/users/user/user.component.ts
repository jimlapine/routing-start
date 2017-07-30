import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Gets user details from route params
    // This is only hit the first time component is loaded
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    }

    /*
      route params is an observable and can be subscribed to
      it watches for changes to the route paramenters
      BEHIND the scense Angular clean up the subscription
      when ever user component is destroyed (navigated away from)
    */
    this.paramsSubscription = this.route.params
      .subscribe(
        // Grab the new paraments passed in route
        (params: Params) => {
          // Assign paramenters to the user
          this.user = {
            id: params['id'],
            name: params['name'],
          }
        }
    );
  }

  ngDestroy() {
    // This is only needed if you add your own observables
    // for these type Angular cleans them up for you.
    this.paramsSubscription.unsubscribe();
  }
}
