import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-applied-offers',
  templateUrl: 'applied-offers.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class AppliedOffersComponent implements OnInit {
  appliedOffers = [];

  ngOnInit() {
    this.profileService.loadStarredOffers().subscribe((result) => {
      this.appliedOffers = result;
    });
  }

  constructor(private profileService: ProfileService) { }
}
