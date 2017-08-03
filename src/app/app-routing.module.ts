import { NgModule } from '@angular/core';
// Imports for Routing
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

// In our example, we didn't encounter any issues when we tried to redirect the user.
// But that's not always the case when adding redirections.
// By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just /
// { path: '', redirectTo: '/somewhere-else' }
// Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?
// Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with
// the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").
// To fix this behavior, you need to change the matching strategy to "full" :
// { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
// Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

// Routes constant
const appRoutes: Routes = [
  // See notes above
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // Declare users and child paths
  // Router outlet is declared in users.component.html
  { path: 'users', component: UsersComponent, children: [
    // : tells angular this is the dynamic part of the path
    { path: ':id/:name', component: UserComponent }
  ] },
  // Declare server path and it's child paths
  // Router outlet declare in servers.component.html

  // canActivate uses code in the auth-guard-servce, if guards the routes
  // Also can user canActivateChild which protects the children paths
  { path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
      children: [
        { path: ':id', component: ServerComponent },
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
      ] },
  { path: 'not-found', component: PageNotFoundComponent },
  // { path: 'something', redirectTo: 'not-found' },
  { path: 'AccessDenied', component: AccessDeniedComponent},
  // Catch every path you don't now and redirect to not found
  // This path should always be the last, paths are processed from top down
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  // Imports the router module and adds our route
  imports: [
    // Register defined routes with Angular
    RouterModule.forRoot(appRoutes)
  ],
  // Make the route module available to other components that include this module
  exports: [RouterModule]
})
export class AppRoutingModule {
}
