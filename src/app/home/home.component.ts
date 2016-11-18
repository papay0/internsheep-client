import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  constructor(private userService: UserService, private router: Router) { }
  goProfile(): void {
    this.router.navigate(['profile']);
  }
}
