import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProfileCompanyService {

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/profile-company', { headers })
      .map(res => res.json())
      .map((res) => res.profile );
  }

  setProfile(profile) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .put('/api/profile-company',
        JSON.stringify(profile),
        { headers })
      .map(res => res.json())
      .map((res) => res.profile );
  }

  loadApplications() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/applications', { headers })
      .map(res => res.json())
      .map(res => res.offers );
  }
  constructor(private http: Http) {}
}
