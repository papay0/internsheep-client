import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ProfileService } from '../_services/profile.service';
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


  constructor(private offersService: OffersService, private profileService: ProfileService, private router: Router) {
   this.offers$ = this.offersService.offers$;
  }

  ngOnInit() {
    this.offersService.loadOffers();
  }

  hasApplied(offer) {
        for(let applied_offer of this.profileService.appliedOffers$.value)
        {
            if(applied_offer.company == offer.company && applied_offer.offer==offer.id)
                return true;
        }
        return false;
    }
}
