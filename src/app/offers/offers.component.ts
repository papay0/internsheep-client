import { Component, OnInit, Pipe } from '@angular/core';
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
  search = "";
  offers = [];

  ngOnInit() {
    this.offersService.loadOffers().subscribe((result) => {
      this.offers = result;
    });
  }

  viewOffer(offer: number) {
    this.router.navigate(['/offer', offer]);
  }

  constructor(private offersService: OffersService, private router: Router) { }
}
