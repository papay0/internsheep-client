import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {
    private login:string; 

  ngOnInit(): void {
    this.userService.getProfile().subscribe((result) => {
      this.login = result.login;
    });
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
  constructor(private http: Http, private userService: UserService) { 
    this.userService.getProfile().subscribe((result) => {
      this.login = result.login;
    });
    console.log("CONS PROFILE SERVICE :");
  }
}
