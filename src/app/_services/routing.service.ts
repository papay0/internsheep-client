import { Injectable } from '@angular/core';

@Injectable()
export class RoutingService {
    private landingPage: string;

    setLandingPage(landingPage: string): void {
        this.landingPage = landingPage;
    }

    getLandingPage(): string {
        return this.landingPage;
    }
}