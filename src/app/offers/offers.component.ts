import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class OffersComponent implements OnInit {

  selectedIndex: number = 0;
  searchLabel = ['company name', 'job title', 'description'];
  search = '';
  private offers$;


  constructor(private offersService: OffersService, private router: Router) {
   this.offers$ = this.offersService.offers$;
  }

  ngOnInit() {
    this.offersService.loadOffers();
  }

}
