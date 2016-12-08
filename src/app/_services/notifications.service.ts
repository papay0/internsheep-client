import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class NotificationsService {
  constructor(private http: Http) {}

  getNotificationsCount() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/notificationsCount', { headers })
      .map(res => res.json())
      .map((res) => res.notificationsCount);
  }

}