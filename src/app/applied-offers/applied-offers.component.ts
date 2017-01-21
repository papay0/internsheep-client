import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import { UserService } from '../_services/user.service';
import { OffersService } from '../_services/offers.service';
import { ConventionDialogComponent } from '../convention-dialog/convention-dialog.component';

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
    dialogRef: MdDialogRef<ConventionDialogComponent>;
    appliedOffers = [];

    ngOnInit() {
        this.applicationService.getApplicationsByStudent(this.userService.getLogin()).subscribe((result) => {
            this.appliedOffers = result;
        });
    }

    openDialog(offer) {
        console.log(offer);
        this.dialogRef = this.dialog.open(ConventionDialogComponent, {
        disableClose: false
        });

        this.dialogRef.componentInstance.params = {
            student: offer.student,
            company: offer.company,
            offer: offer.offer
        };

        this.dialogRef.afterClosed().subscribe(result => {
        console.log('result: ' + result);
        this.dialogRef = null;
        });
    }

    constructor(private applicationService: ApplicationService,
                private userService: UserService,
                private offersService: OffersService,
                public dialog: MdDialog) { }
}
