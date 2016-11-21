import { Component, ViewContainerRef } from '@angular/core';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: 'profile-company.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class ProfileCompanyComponent {

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
      this.toastService.displayToast('Updated!');
    }
  }

  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef) { }
}
