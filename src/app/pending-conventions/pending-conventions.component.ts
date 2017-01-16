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

    _conventionState = 'Pending conventions';
    selectedIndex: number = 0;
    stateFilters = [
        { label: 'Pending conventions', state: 'pending' },
        { label: 'Accepted conventions', state: 'accepted' },
        { label: 'Refused conventions', state: 'refused' }
    ];

    ngOnInit(): void {
        this.applicationService.getApplicationsForOffice().subscribe((result) => {
            this.conventions = result;
        });
    }

    constructor(private offersService: OffersService, private applicationService: ApplicationService, private router: Router) { }
}
