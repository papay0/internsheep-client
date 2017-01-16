import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProfileService {

  loadCVs() {
    console.log('loadCVs');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return this.http
      .get('http://localhost:3000/api/user/papa/files', { headers })
      .map(res => {return res.json();});
  }

  loadStarredOffers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/starredOffers', { headers })
      .map(res => res.json())
      .map(res => res.offers );
  }
  constructor(private http: Http) {}
}
