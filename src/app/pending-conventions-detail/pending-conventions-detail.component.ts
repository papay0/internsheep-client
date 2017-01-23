import { Component, Input } from '@angular/core';
import { ConventionDialogComponent } from '../convention-dialog/convention-dialog.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {MdDialog, MdDialogRef } from '@angular/material';

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
    dialogRef: MdDialogRef<ConventionDialogComponent>;

    openDialog() {
        this.dialogRef = this.dialog.open(ConventionDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.params = {
            student: this.convention.student,
            company: this.convention.company,
            offer: this.convention.offer
        };

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

    constructor(public dialog: MdDialog) {
    }
}


