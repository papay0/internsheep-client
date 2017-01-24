import { Component, OnInit} from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ApplicationService } from '../_services/application.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-pending-conventions',
    templateUrl: './pending-conventions.component.html',
    styles: [`
    md-card {
      margin: 20px;
    }
    `]
})
export class PendingConventionsComponent implements OnInit {
    public conventions$ = new BehaviorSubject([]);

    _conventionState = 'Pending applications';
    selectedIndex: number = 0;
    stateFilters = [
        { label: 'To-Check applications', state: 'wait_for_internship_office' },
        { label: 'All applications', state: 'any' },
        { label: 'Accepted applications', state: 'accepted' },
        { label: 'Refused applications', state: 'refused' }
    ];

    ngOnInit(): void {
        console.log("NG-PENDING-INIT");
        this.applicationService.getApplicationsForOffice().subscribe((result) => {
            this.conventions$.next(result);
        });
    }

    constructor(private offersService: OffersService, private applicationService: ApplicationService, private router: Router) { }
}
