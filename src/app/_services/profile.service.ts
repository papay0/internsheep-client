import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from '../_services/application.service';

@Injectable()
export class ProfileService {
    private login:string; 
    public appliedOffers$ = new BehaviorSubject([]);

  getLogin() : string {
    return this.login;
  }

  loadCVs() {
    console.log('loadCVs for '+this.login);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return this.http
      .get('http://localhost:3000/api/user/'+this.login+'/files', { headers })
      .map(res => {return res.json();});
  }

  getUploadUrl(){
      return 'http://localhost:3000/api/user/'+this.login+'/files/greg_is_useless';
  }

  deleteCV(url) {
    console.log('deleteCVs');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return this.http.delete(url, { headers });
  }

  reloadAppliedOffers()
  {
    this.applicationService.getApplicationsByStudent(this.login).subscribe((result) => {
        console.log(this.login+" applied: "+JSON.stringify(result));
        this.appliedOffers$.next(result);
    });
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
  constructor(private http: Http, private userService: UserService, private applicationService: ApplicationService) { 
    this.userService.getProfile().subscribe((result) => {
      this.login = result.login;
        this.reloadAppliedOffers();
    });
    console.log("CONS PROFILE SERVICE :");
  }
}
