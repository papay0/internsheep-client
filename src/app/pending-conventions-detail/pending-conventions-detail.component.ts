import { Component, Input } from '@angular/core';
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

        this.dialogRef.afterClosed().subscribe(result => {
        console.log('result: ' + result);
        this.dialogRef = null;
        });
    }

    constructor(public dialog: MdDialog) {
    }
}

@Component({
  selector: 'app-pending-conventions-dialog',
  templateUrl: './pending-conventions-dialog.component.html'
})
export class PendingConventionsDialogComponent {

    refuseButtonClick() {
        console.log('resuse clicked');
    }

    acceptButtonClick() {
        console.log('accept clicked');
        this.dialogRef.close(true);
    }

  constructor(public dialogRef: MdDialogRef<PendingConventionsDialogComponent>) { }
}


