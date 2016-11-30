import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) { }
  goHome(): void {
    this.router.navigate(['home']);
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

  isStudent(): boolean {
    return this.userService.isLoggedStudent();
  }

  isCompany(): boolean {
    return this.userService.isLoggedCompany();
  }

  goProfile(): void {
    this.router.navigate(['student/profile']);
  }
  goCompanyProfile(): void {
    this.router.navigate(['company/profile']);
  }
  goOffers(): void {
    this.router.navigate(['offers']);
  }

}
