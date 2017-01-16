import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: 'profile-info.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class ProfileInfoComponent implements OnInit {

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

  stateFormProfile = this.readState;
  profile = {};

  ngOnInit(): void {
    /*
    this.profileService.getProfile().subscribe((result) => {
      this.profile = result;
      console.log(this.profile);
    }); */
  }

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      this.profileService.setProfile(this.profile);
      this.stateFormProfile = this.readState;
      this.toastService.show('Updated!');
    }
  }

  constructor(private toastService: ToastService, private profileService: ProfileService) { }
}
