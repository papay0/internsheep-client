import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-company-offers',
  templateUrl: 'company-offers.component.html',
  styles: [`  md-card {
    margin: 20px;
  }
  
  md-card-header {
    display:flex;
  }

  .interrested_people{
    flex:1;
  }

  `]
})
export class CompanyOffersComponent implements OnInit {

  offers = [];

  ngOnInit() {
    let company = this.userService.getLogin();
    this.offersService.getCompanyOffers(company).subscribe((result) => {
      this.offers = result;
    });
  }

  constructor(private offersService: OffersService, private userService: UserService) { }
}
