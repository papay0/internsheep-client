import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../_services/profile.service';

import {MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-applied-offers',
  templateUrl: 'applied-offers.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class AppliedOffersComponent implements OnInit {
    @Input() convention;
    dialogRef: MdDialogRef<StudentConventionDialogComponent>;
    appliedOffers = [];

  ngOnInit() {
    /*
    this.profileService.loadStarredOffers().subscribe((result) => {
      this.appliedOffers = result;
    });*/
  }

    openDialog() {
        this.dialogRef = this.dialog.open(StudentConventionDialogComponent, {
        disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result => {
        console.log('result: ' + result);
        this.dialogRef = null;
        });
    }

  constructor(private profileService: ProfileService, public dialog: MdDialog) { }
}

@Component({
  selector: 'app-student-convention-dialog',
  templateUrl: './student-convention-dialog.component.html'
})
export class StudentConventionDialogComponent {

    refuseButtonClick() {
        console.log('resuse clicked');
    }

    acceptButtonClick() {
        console.log('accept clicked');
        this.dialogRef.close(true);
    }

  constructor(public dialogRef: MdDialogRef<StudentConventionDialogComponent>) { }
}