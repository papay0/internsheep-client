import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ApplicationService } from '../_services/application.service';
import { BehaviorSubject } from 'rxjs';

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
    applications$ = new BehaviorSubject([]);

    ngOnInit() {
        this.applicationService.getApplicationsByCompany(this.userService.getLogin())
        .subscribe((result) => {
            console.log(JSON.stringify(result));
            this.applications$.next(result);
        });
    }

    reloadApplications() {
        this.applicationService.getApplicationsByCompany(this.userService.getLogin())
        .subscribe((result) => {
            console.log("Reloading Applications...");
            this.applications$.next(result);
        });
    }

    constructor(private userService: UserService, private applicationService: ApplicationService) { }
}
