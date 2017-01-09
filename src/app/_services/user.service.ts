import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from "../_model/User";

@Injectable()
export class UserService {
  private loggedIn = false;
  public token: string;
  private userProfile: User = {id: -1, name: "", familyName: "", type: -1, email: ""};

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    let up = JSON.parse(localStorage.getItem('user_profile'));
    if (up) {
      this.userProfile = up;
    }
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .post(
      '/api/authenticate',
      JSON.stringify({ email, password }),
      {headers})
      .map((res) => {
      let token = res.json() && res.json().token;
      let userProfile = res.json() && res.json().profile;
      if (token) {
        this.token = token;
        this.loggedIn = true;
        this.userProfile = userProfile;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_identity', email);
        localStorage.setItem('user_profile', JSON.stringify(userProfile));
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

  isStudent() {
    return (this.userProfile.type==0);
  }

  isCompany() {
    return (this.userProfile.type==1);
  }

  isLoggedStudent() {
    return this.isLoggedIn() && this.isStudent();
  }

  isLoggedCompany() {
    return this.isLoggedIn() && this.isCompany();
  }

  getFamilyName(){
    var ret = "";
    if (this.isLoggedIn){
      ret = this.userProfile.familyName;
    }
    return ret;
  }

  getInfoById(userId): any { // TODO: Create an interface here for the return Type
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/user/1', { headers })
      .map(res => res.json())
      .map((res) => res.info );
  }
}
