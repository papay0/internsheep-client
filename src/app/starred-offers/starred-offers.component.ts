import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-starred-offers',
  templateUrl: 'starred-offers.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class StarredOffersComponent implements OnInit {
  starredOffers = [];

  ngOnInit() {
    this.profileService.loadStarredOffers().subscribe((result) => {
      this.starredOffers = result;
    });
  }

  menuClick(offer): void {
  }

  constructor(private profileService: ProfileService) { }
}
