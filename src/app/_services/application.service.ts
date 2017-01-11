import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ApplicationService {
    getApplicationDetails(conventionId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/application/' + conventionId, { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    setApplication(conventionId, application) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .put('/api/application/' + conventionId, JSON.stringify(application), { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    getApplications() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/applications', { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    constructor(private http: Http) {}
}
