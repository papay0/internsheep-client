import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    constructor(private userService: UserService, private router: Router) { }

    goProfile(): void {
        this.router.navigate(['student/profile']);
    }

    goCompanyProfile(): void {
        this.router.navigate(['company/profile']);
    }

    goOffers(): void {
        this.router.navigate(['offers']);
    }

    isLoggedStudent(): boolean {
        return this.userService.isLoggedStudent();
    }

    isLoggedCompany(): boolean {
        return this.userService.isLoggedCompany();
    }

    isLoggedInternshipOffice(): boolean {
        return this.userService.isLoggedInternshipOffice();
    }

}
