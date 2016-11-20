import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private loggedIn = false;
  public token: string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        '/api/authenticate',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map((res) => {
        let token = res.json() && res.json().token;
        if (token) {
            this.token = token;
            this.loggedIn = true;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_identity', email);
            return true;
        } else {
            return false;
        }
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
