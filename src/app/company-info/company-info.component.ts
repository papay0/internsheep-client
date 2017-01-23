import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { UserService } from '../_services/user.service';
import { User } from '../_model/User';

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
  profile: User = { id: -1, login: '' };

  ngOnInit(): void {
    this.userService.getProfile().subscribe((result) => {
      this.profile = result;
    });
  }

  editButtonClick(): void {
    if (!this.stateFormProfile.editionMode) {
      this.stateFormProfile = this.editState;
    } else {
      this.userService.setProfile(this.profile.login, this.profile).subscribe(() => {});
      this.stateFormProfile = this.readState;
      this.toastService.show('Updated!');
    }
  }

  constructor(private toastService: ToastService, private userService: UserService) { }
}
