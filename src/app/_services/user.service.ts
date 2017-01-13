import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClient } from './http.client';

import { User } from "../_model/User";

@Injectable()
export class UserService {
  private loggedIn = false;
  public token: string;
  private userProfile$: BehaviorSubject<User> = new BehaviorSubject({id: -1, name: "", familyName: "", type: -1, email: ""});

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (localStorage.getItem('user_profile')){
      this.userProfile$.next(JSON.parse(localStorage.getItem('user_profile')));
    }

  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   

    return this.http
    .post(
      '/api/token',
      JSON.stringify({ login: email, password }),
      { headers }
      )
    .map((res) => {
      let token = res.json() && res.json().access_token;
      console.log("lol1");
      //
      if (token) {
        this.token = token;
        this.loggedIn = true;
        console.log("lol4");

        this.http
        .get(
          '/api/user/'+email+'/profile', (headers)
        )
        .map((res) => res.json())
        .subscribe((res) => {
          console.log("lol3");
          console.log("res: "+res);
          console.log("userprofile: "+ JSON.stringify(res));
          this.userProfile$.next(res);
          localStorage.setItem('user_profile', JSON.stringify(res));
        });

        console.log("lol2");
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

  isStudent() {
    return (this.userProfile$.value.type==0);
  }

  isCompany() {
    return (this.userProfile$.value.type==1);
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
      ret = this.userProfile$.value.familyName;
    }
    return ret;
  }

  getUserProfile(){
    return this.userProfile$;
  }

  getInfoById(userId): any { // TODO: Create an interface here for the return Type
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/user/'+userId+'/profile/', { headers })
      .map(res => res.json());
  }
}
