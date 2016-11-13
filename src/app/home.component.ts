import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent { 
  constructor(private userService: UserService, private router: Router) { }
  
  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
}