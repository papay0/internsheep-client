import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { RoutingService } from '../_services/routing.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  constructor(private userService: UserService, private router: Router, private routingService: RoutingService) { }
}
