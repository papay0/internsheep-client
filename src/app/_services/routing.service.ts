import { Injectable } from '@angular/core';

@Injectable()
export class RoutingService {
    private landingPage: string;

    setLandingPage(landingPage: string): void {
        this.landingPage = landingPage;
    }

    getLandingPage(): string {
        let landingPage = this.landingPage;
        this.landingPage = '/'; // so that I do not land again if I didn't ask it
        return landingPage;
    }
}