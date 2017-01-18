import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ApplicationService } from '../_services/application.service';
import { Router } from '@angular/router';


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
    conventions = [];

    _conventionState = 'Pending applications';
    selectedIndex: number = 0;
    stateFilters = [
        { label: 'To-Check applications', state: 'wait_for_internship_office' },
        { label: 'All applications', state: 'any' },
        { label: 'Accepted applications', state: 'accepted' },
        { label: 'Refused applications', state: 'refused' }
    ];

    ngOnInit(): void {
        this.applicationService.getApplications().subscribe((result) => {
            console.log(result[0]);
            this.conventions = result;
        });
    }

    constructor(private offersService: OffersService, private applicationService: ApplicationService, private router: Router) { }
}
