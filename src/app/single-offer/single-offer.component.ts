import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'single-offer',
  templateUrl: './single-offer.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class SingleOfferComponent implements OnInit {

  private offer_ids : {offer_id: number, comp_id: number};

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    let ids = this.route.params;
    console.log(ids);
    this.offer_ids = this.route.params;
  }
}
