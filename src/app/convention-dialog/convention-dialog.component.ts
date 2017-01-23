import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import { UserService } from '../_services/user.service';

import {MdDialogRef } from '@angular/material';



@Component({
  selector: 'app-convention-dialog',
  templateUrl: './convention-dialog.component.html',
  styles: [`
    .formGroup {
        margin-left: 15px;
        margin-bottom: 30px;
    }
    .formElement {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .formElement md-input, .formElement md-textarea, .formElement md-select {
        flex-grow: 1;
        margin: 0 5px;
    }
    .formElement md-radio-button, .formElement md-select {
        margin: 10px;
    }
    .formElement .small {
        width: 120px;
        flex-grow: 0;
    }
  `]
})
export class ConventionDialogComponent implements OnInit {

    params = { student: '', company: '', offer: '' };
    convention = { student: {}, company: {} };

    ngOnInit() {
        this.applicationService
        .getApplicationDetails(this.params.student, this.params.company, this.params.offer)
        .subscribe((result) => {
            this.convention = result;
            this.userService.getInfoById(this.params.student).subscribe((result2) => {
                this.convention.student = result2;
            });
            this.userService.getInfoById(this.params.company).subscribe((result2) => {
                this.convention.company = result2;
            });
        });
    }

    isStaff(): boolean {
        return this.userService.isLoggedInternshipOffice();
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

    getDomains() {
        return [
            'SSII'
        ];
    }

  constructor(public dialogRef: MdDialogRef<ConventionDialogComponent>,
              private applicationService: ApplicationService, private userService: UserService) { }
}
