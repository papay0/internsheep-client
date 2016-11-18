import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-layout>
      <md-toolbar color="primary">
        <button md-button (click)="goHome()" style="float: right">INTERNSHEEP</button>
        <span class="app-toolbar-filler"></span>
        <button md-raised-button color="accent" (click)="goLogin()" *ngIf="!isLoggedIn()">LOG IN</button>
        <button md-raised-button color="accent" (click)="logout()" *ngIf="isLoggedIn()">LOG OUT</button>
      </md-toolbar>
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>
      <div id="snackbar"></div>
    </md-sidenav-layout>
  `,
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) { }
  goHome(): void {
    this.router.navigate(['']);
  }
  goLogin(): void {
    this.router.navigate(['login']);
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
