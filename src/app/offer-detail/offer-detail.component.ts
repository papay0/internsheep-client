import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Offer } from '../_model/Offer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ToastService } from '../_services/toast.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: 'offer-detail.component.html',
  styles: [`
    md-card {
    margin: 20px;
    }
    md-card-content {
    padding-left: 10px;
    }
    `]
})
export class OfferDetailComponent implements OnInit {

  @Input() offer: Offer;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  private _showDetails: boolean = false;
  private _showApply: boolean = true;

  private documents = [];

  ngOnInit(): void {
      this.showDetails = false;
      this.showApply = true;
  }

  constructor(
    private offersService: OffersService,
    private toastService: ToastService,
    private profileService: ProfileService) {
  }

  set showDetails(show: boolean) {
    this._showDetails = show;
    this.getDetailsFromInput();
  }

  get showDetails(): boolean {
    return this._showDetails;
  }

  set showApply(show: boolean) {
    this._showApply = show;
    if (show) {
      this.toastService.show('Application successfully sent!');
    } else { // click on APPLY
      this.profileService.loadCVs().subscribe((result) => {
        this.documents = JSON.parse(JSON.stringify(result));
      });
    }
  }

  get showApply(): boolean {
    return this._showApply;
  }

  getDetailsFromInput(): void {
    /*console.log(this.offer.id);
    this.offersService.getOffersDetails(this.offer.id, this.offer.company_id)
    .subscribe(details => this.offer = details || this.offer);*/
  }

  getStart(): string {
    return this.months[this.offer.start];
  }

  isLoaded(): boolean {
    return (!!this.offer);
  }

}
