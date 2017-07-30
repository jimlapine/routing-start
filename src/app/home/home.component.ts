import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedin = false;
  constructor(private router: Router, private authService: AuthService) { }

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

  onLogin() {
    this.loggedin = true;
    this.authService.login();
  }

  onLogout() {
    this.loggedin = false;
    this.authService.logout();
  }
}
