import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '../_services/http.client'

@Injectable()
export class OffersService {
  constructor(private http: HttpClient) {}

  loadOffers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/company/offers', { headers })
      .map(res => res.json());
  }

  //@Deprecated
  getCompanyOffers(company: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/company/' + company + "/offers", { headers })
      .map(res => res.json())
      .map((res) => res.offers );
  }

  getOffersDetails(offer: number, company_id: number){
    console.log("getOfferDetails log: " + company_id + " | " + offer)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/api/company/' + company_id + "/offer/" + offer, { headers })
      .map(res => res.json())
      .map((res) => res.details );
  }
  

}