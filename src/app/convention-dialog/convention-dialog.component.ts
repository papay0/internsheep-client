import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import { UserService } from '../_services/user.service';

import {MdDialogRef } from '@angular/material';



@Component({
  selector: 'app-convention-dialog',
  templateUrl: './convention-dialog.component.html'
})
export class ConventionDialogComponent implements OnInit {

    params = { student: '', company: '', offer: '' };
    convention = { student: {}, company: {} };

    ngOnInit() {
        this.applicationService
        .getApplicationDetails(this.params.student, this.params.company, this.params.offer)
        .subscribe((result) => {
            this.convention = result;
            this.userService.getProfile(this.params.student).subscribe((result2) => {
                this.convention.student = result2;
            });
            this.userService.getProfile(this.params.company).subscribe((result2) => {
                this.convention.company = result2;
            });
        });
    }

    isStaff(): boolean {
        return this.userService.isLoggedStaff();
    }

    isStudent(): boolean {
        return this.userService.isLoggedStudent();
    }

    refuseButtonClick() {
        console.log('refuse clicked');
    }

    acceptButtonClick() {
        console.log('accept clicked');
        this.dialogRef.close(true);
    }

  constructor(public dialogRef: MdDialogRef<ConventionDialogComponent>,
              private applicationService: ApplicationService, private userService: UserService) { }
}
