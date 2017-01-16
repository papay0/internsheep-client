import { Component, Input } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {MdDialog, MdDialogRef } from '@angular/material';
// import { PendingConventionsDialogComponent } from '../_dialog/pending-conventions-dialog.component';

@Component({
    selector: 'app-pending-conventions-detail',
    templateUrl: 'pending-conventions-detail.component.html',
    styles: [`
        md-card {
            margin: 20px;
        }
        md-card-content {
            padding-left: 10px;
        }
        `]
})
export class PendingConventionsDetailComponent {
    @Input() convention;
    dialogRef: MdDialogRef<PendingConventionsDialogComponent>;

    openDialog() {
        this.dialogRef = this.dialog.open(PendingConventionsDialogComponent, {
            disableClose: false
        });

        this.applicationService
        .getApplicationDetails(this.convention.student, this.convention.company, this.convention.offer)
        .subscribe((result) => {
            this.dialogRef.componentInstance.details = result;
        });

        this.dialogRef.afterClosed().subscribe(result => {
            console.log('result: ' + result);
            this.dialogRef = null;
        });
    }

    constructor(public dialog: MdDialog, private applicationService: ApplicationService) {
    }
}

@Component({
  selector: 'app-pending-conventions-dialog',
  templateUrl: './pending-conventions-dialog.component.html'
})
export class PendingConventionsDialogComponent {

    details = {};

    refuseButtonClick() {
        console.log('resuse clicked');
    }

    acceptButtonClick() {
        console.log('accept clicked');
        this.dialogRef.close(true);
    }

  constructor(public dialogRef: MdDialogRef<PendingConventionsDialogComponent>,
              private applicationService: ApplicationService) { }
}


