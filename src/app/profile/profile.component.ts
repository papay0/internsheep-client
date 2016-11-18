import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { ToastService } from '../_services/toast.service';

import { User } from '../_model/User';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class ProfileComponent implements OnInit {

  editState = {
    label: 'Update',
    editionMode: true,
    inputDisabled: false,
    color: 'primary'
  };
  readState = {
    label: 'Edit',
    editionMode: false,
    inputDisabled: true,
    color: 'accent'
  };

  user: User;
  stateFormProfile = this.readState;
  mockStarredOffers = [];

  ngOnInit() {
    this.profileService.loadStarredOffers().subscribe((result) => {
      this.mockStarredOffers = result;
    });
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe((result) => {
      this.user = new User();
      this.user.name = result.name;
      this.user.familyName = result.familyName;
    });
  }

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      this.stateFormProfile = this.readState;
      this.toastService.displayToast('Updated!');
    }
  }

  menuClick(offer): void {
    console.log(offer);
  }

  constructor(private profileService: ProfileService, private toastService: ToastService, private viewContainerRef: ViewContainerRef) { }
}
