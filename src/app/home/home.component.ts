import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers(id: number) {
    // Complex calc, call to backend, etc

    // Allows us to trigger routing programatically
    this.router
      .navigate(['/servers', id, 'edit'],
      {queryParams: {alllowEdit: '1'},
      // If desired I can also add a fragment #value
      fragment: 'loading'}
    );
  }
}
