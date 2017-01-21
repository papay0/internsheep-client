import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../_services/user.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ConventionDialogComponent } from '../convention-dialog/convention-dialog.component';
import { ToastService } from '../_services/toast.service';

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
export class PendingConventionsDetailComponent implements OnInit  {
    @Input() convention;
    dialogRef: MdDialogRef<ConventionDialogComponent>;
    showDetailDocuments: boolean = false;

    appliedOffers = [];

    documents = [
        {
            id: 1, title: 'Convention-Arthur-Papailhau-Apple.pdf',
            url: 'http://etud.insa-toulouse.fr/~papailha/papailhau/file/Resume Arthur Papailhau.pdf'
        },
    ];

    ngOnInit() {
        this.applicationService.getApplicationsByStudent(this.userService.getLogin()).subscribe((result) => {
            this.appliedOffers = result;
        });
    }

    acceptButtonCLicked() {
        this.convention = undefined;
        this.toastService.show('Convention accepted ✅');
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

    constructor(public dialog: MdDialog,
        private applicationService: ApplicationService,
        private userService: UserService,
        private toastService: ToastService)
    {}
}