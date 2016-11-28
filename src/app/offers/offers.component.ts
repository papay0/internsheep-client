import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';


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
  offers = [];

  ngOnInit() {
    this.offersService.loadOffers().subscribe((result) => {
      this.offers = result;
    });
  }
  constructor(private offersService: OffersService) { }
}
