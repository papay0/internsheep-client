import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})

export class ProfileComponent { 

  isLoggedStudent(): boolean{
    return this.userService.isLoggedStudent();
  }

  isLoggedCompany(): boolean{
    return this.userService.isLoggedCompany();
  }

  constructor(private userService: UserService) {}

}
