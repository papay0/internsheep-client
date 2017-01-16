import { Component, ViewContainerRef } from '@angular/core';
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
export class ProfileInfoComponent {

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

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      this.stateFormProfile = this.readState;
      this.toastService.show('Updated!');
    }
  }

  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef, private userservice: UserService) {
    this.userprofile$ = userservice.getUserProfile();
    console.log(this.userprofile$.value);
   }
}
