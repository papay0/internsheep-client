import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from './http.client';

@Injectable()
export class ApplicationService {
    private targetURL : string = "";
    getApplicationDetails(student: string, company: string, offer: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/applications/${student}/${company}/${offer}`, { headers })
            .map((res) => {console.log(res); return res.json();})
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

    createApplication(student: string, company: string, offer: number, application) {
        console.log("createApplication");
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .post(`/api/applications/${student}/${company}/${offer}/post`, JSON.stringify(application), { headers })
            .map((res) => {console.log(res); return res.json();})
            .map((res) => res.application );
    }

    getApplications() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('http://localhost:8173/applications/internship_office', { headers })
            .map((res) => {console.log("OKLM"); return res.json();});
    }

    getApplicationsByStudent(student: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/applications/${student}`, { headers })
            .map(res => res.json());
            //.map((res) => res.applications );
    }

    getApplicationsByOffer(offer: string, company: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/applications', { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    getApplicationsByCompany(company: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/applications', { headers })
            .map(res => res.json())
            .map((res) => res.applications );
    }

    constructor(private http: HttpClient) {}
}
