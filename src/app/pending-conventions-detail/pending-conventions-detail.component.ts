import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ConventionDialogComponent } from '../convention-dialog/convention-dialog.component';
import { ApplicationService } from '../_services/application.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../_services/user.service';

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
export class PendingConventionsDetailComponent implements OnInit {
    @Input() convention;
    @Output() convention_changed = new EventEmitter() ;
    dialogRef: MdDialogRef<ConventionDialogComponent>;
    applicant$ = new BehaviorSubject({});
    was_accepted$ = new BehaviorSubject(false);
    was_refused$ = new BehaviorSubject(false);

    ngOnInit() {
        this.userService.getInfoById(this.convention.login)
            .subscribe((result) => {
                this.applicant$.next(result);
        });
    }

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
    
    acceptConvention(){
        if(this.convention.state == 'wait_for_internship_office'){
            console.log(JSON.stringify("Convention Accepted :)"));
            this.was_accepted$.next(true);
            this.applicationService
            .setApplication(this.convention.login, this.convention.company, this.convention.offer, {state: "accepted"})
            .subscribe((result) => {
                console.log(JSON.stringify("Convention Accepted :)"));
            });
        }
    }
    
    refuseConvention(){
        console.log(JSON.stringify("Convention Refused :("));
        this.was_refused$.next(true);
        this.applicationService
        .setApplication(this.convention.login, this.convention.company, this.convention.offer, {state: "refused"})
        .subscribe((result) => {
            console.log(JSON.stringify("Convention Refused :("));
        });
    }

    constructor(public dialog: MdDialog, private applicationService: ApplicationService, private userService: UserService) {
    }
}


