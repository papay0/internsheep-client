import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ApplicationService } from '../_services/application.service';

@Component({
    selector: 'app-company-applications',
    templateUrl: 'company-applications.component.html',
    styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class CompanyApplicationsComponent implements OnInit {
    applications = [];

    ngOnInit() {
        this.applicationService.getApplicationsByCompany(this.userService.getLogin())
        .subscribe((result) => {
            this.applications = result;
        });
    }

    constructor(private userService: UserService, private applicationService: ApplicationService) { }
}
