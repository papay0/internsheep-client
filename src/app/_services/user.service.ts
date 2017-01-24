import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from './http.client';

import { User } from '../_model/User';

@Injectable()
export class UserService {
    private loggedIn = false;
    public token: string;
    public userProfile$: BehaviorSubject<User> = new BehaviorSubject({ id: -1, name: '', lastName: '', type: -1, email: '' });

    constructor(private http: HttpClient) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    login(email, password) {
        this.logout();
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
                //
                if (token) {
                    this.token = token;
                    this.loggedIn = true;
                    email = email.replace("@", "_40");
                    this.http
                        .get(
                        '/api/user/' + email + '/profile', (headers)
                        )
                        .map((profileStr) => profileStr.json())
                        .subscribe((profile) => {
                            console.log("Profile: "+JSON.stringify(profile));
                            profile.login = profile.login.replace("_40", "@");
                            
                            this.userProfile$.next(profile);
                            localStorage.setItem('user_profile', JSON.stringify(profile));
                        });

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
        localStorage.removeItem('user_profile');
        localStorage.removeItem('auth_identity');
        this.userProfile$.next({ id: -1, name: '', type: -1, email: '' });
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    isStudent() {
        return (+this.userProfile$.value.type === 1);
    }

    isCompany() {
        return (+this.userProfile$.value.type === 2);
    }

    isInternshipOffice() {
        console.log("My type is : "+this.userProfile$.value.type);
        return (+this.userProfile$.value.type === 3);
    }

    isLoggedStudent() {
        return this.isLoggedIn() && this.isStudent();
    }

    isLoggedCompany() {
        return this.isLoggedIn() && this.isCompany();
    }

    isLoggedInternshipOffice() {
        return this.isLoggedIn() && this.isInternshipOffice();
    }

    getFamilyName() {
        let ret = '';
        console.log("OK ma poule");
        if (this.isLoggedIn) {
            ret = this.userProfile$.value.lastName;
        }
        return ret;
    }

    getLogin() {
        let ret = '';
        if (this.isLoggedIn) {
            ret = this.userProfile$.value.login;
        }
        return ret;
    }

    getProfile() {
        return this.userProfile$;
    }

    getInfoById(userId): any { // TODO: Create an interface here for the return Type
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/user/' + userId + '/profile/', { headers })
            .map(res => res.json());
    }

    setProfile(login: string, profile) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .put('/api/user/' + login,
            JSON.stringify(profile),
            { headers })
            .map(res => res.json())
            .map((res) => res.user);
    }
}
