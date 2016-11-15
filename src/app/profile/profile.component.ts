import { Component } from '@angular/core';
import { ProfileService } from '../_services/profile.service';

import { User } from '../_model/User';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent { 
  constructor(private profileService: ProfileService) { }

  user: User;

  getProfile(): void {
    this.profileService.getProfile().subscribe((result) => {
      this.user = new User();
      this.user.name = result.name;
      this.user.familyName = result.familyName;
    });
  }
}
