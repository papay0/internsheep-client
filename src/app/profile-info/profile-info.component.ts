import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { UserService } from '../_services/user.service';

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

  private userprofile$;

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
  profile = { login: '' };

  ngOnInit(): void {
/*
    this.userService.getProfile(this.userService.getLogin()).subscribe((result) => {
      this.profile = result;
      console.log(this.profile);
    }); */
  }

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      console.warn('/!\ profile-info ts setProfile not implemented');
      //this.userService.setProfile(this.profile.login, this.profile);
      this.stateFormProfile = this.readState;
      this.toastService.show('Updated!');
    }
  }

  constructor(private toastService: ToastService, private userService: UserService) {
    this.userprofile$ = userService.getProfile();
    console.log(this.userprofile$.value);
   }
}
