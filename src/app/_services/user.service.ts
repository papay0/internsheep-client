import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserService {
    private loggedIn = false;
    public token: string;
    private userProfile = { id: -1, type: -1, login: '' };

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
            { headers })
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

    private isStudent() {
        return (this.userProfile.type === 0);
    }

    private isCompany() {
        return (this.userProfile.type === 1);
    }

    private isStaff() {
        return (this.userProfile.type === 2);
    }

    isLoggedStudent() {
        return this.isLoggedIn() && this.isStudent();
    }

    isLoggedCompany() {
        return this.isLoggedIn() && this.isCompany();
    }

    isLoggedStaff() {
        return this.isLoggedIn() && this.isStaff();
    }

    getLogin() {
        let ret = '';
        if (this.isLoggedIn) {
            ret = this.userProfile.login;
        }
        return ret;
    }

    getProfile(login: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/user/' + login, { headers })
            .map(res => res.json())
            .map((res) => res.user);
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
