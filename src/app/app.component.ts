import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

import { UserService } from './_services/user.service';
import { NotificationsService } from './_services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent implements OnInit {

  notificationsCount = 0;

  constructor(private userService: UserService, private notificationsService: NotificationsService, private router: Router) { }
  ngOnInit() {
    this.notificationsService.getNotificationsCount().subscribe((result) => {
      this.notificationsCount = result.count;
    });
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

  goNotification(): void {
    this.router.navigate(['notifications']);
  }
}
