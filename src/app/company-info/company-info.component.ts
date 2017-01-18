import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { ProfileCompanyService } from '../_services/profile-company.service';

@Component({
  selector: 'app-company-info',
  templateUrl: 'company-info.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class CompanyInfoComponent implements OnInit {

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
    this.profileService.getProfile().subscribe((result) => {
      this.profile = result;
    });
  }

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      this.profileService.setProfile(this.profile).subscribe(() => {});
      this.stateFormProfile = this.readState;
      this.toastService.show('Updated!');
    }
  }

  constructor(private toastService: ToastService, private profileService: ProfileCompanyService) { }
}
