import { Injectable } from '@angular/core';

@Injectable()
export class RoutingService {
    private landingPage: string = '/home';

    setLandingPage(landingPage: string): void {
        console.log('set: ' + landingPage);
        this.landingPage = landingPage;
    }

    getLandingPage(): string {
        console.log('get: ' + this.landingPage);
        let landingPage = this.landingPage;
        this.landingPage = '/home'; // so that I do not land again if I didn't ask it
        return landingPage;
    }
}
