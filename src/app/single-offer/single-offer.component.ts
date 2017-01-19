import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styles: [`
    md-card {
    margin: 20px;
    }
    `]
})
export class SingleOfferComponent implements OnInit {

  private offer$ = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute, private offerService: OffersService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let offer_id = +params['offer_id'];
      let comp_id = +params['company_id'];
      this.offerService.getOfferDetails(offer_id, comp_id).subscribe((off) => {
        this.offer$.next(off);
      });
    });
  }
}
