import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // We can grab the message from the route snapshot
    this.errorMessage = this.route.snapshot.data['message'];

    // Or just like query parameters, this is an observable and can be subscribed to
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}
