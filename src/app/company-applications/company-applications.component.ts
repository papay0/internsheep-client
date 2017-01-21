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
    pendingApplications = [{applicant: 'JJ C', title: 'Watch Engineer', appliedDate: '10/08/2015'},
        {applicant: 'Arthur Papailhau', title: 'Backend Software Engineer', appliedDate: '26/01/2017'}];
    acceptedApplications = [];
    refusedApplications = [];

    ngOnInit() {
    }

    acceptedButtonClick() {
        console.log('accept clicked');
        this.acceptedApplications.push(this.pendingApplications[0]);
        this.pendingApplications.splice(0, 1);
    }

    refusedButtonClicked() {
        console.log('refuse clicked');
        this.refusedApplications.push(this.pendingApplications[0]);
        this.pendingApplications.splice(0, 1);
    }

    constructor(private userService: UserService, private applicationService: ApplicationService) { }
}
