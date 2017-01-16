import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ApplicationService {
    getApplicationDetails(student: string, company: string, offer: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/applications/${student}/${company}/${offer}`, { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    setApplication(student: string, company: string, offer: string, application) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .put(`/api/applications/${student}/${company}/${offer}`, JSON.stringify(application), { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    createApplication(student: string, company: string, offer: string, application) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .post(`/api/applications/${student}/${company}/${offer}`, JSON.stringify(application), { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    getApplicationsForOffice() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/applications/internship_office', { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    getApplicationsByStudent(student: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/user/${student}/applications`, { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    getApplicationsByOffer(company: string, offer: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/offer/${company}/${offer}/applications`, { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    getApplicationsByCompany(company: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
    .get(`/api/company/${company}/applications`, { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    constructor(private http: Http) {}
}
