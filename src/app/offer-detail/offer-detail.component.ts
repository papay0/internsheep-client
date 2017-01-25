import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ApplicationService } from '../_services/application.service';
import { Offer } from '../_model/Offer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ToastService } from '../_services/toast.service';
import { ProfileService } from '../_services/profile.service';
import { BehaviorSubject } from 'rxjs';

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

  private applied$ = new BehaviorSubject(false);

  private _showDetails: boolean = false;
  private _showDocs: boolean = false;

  private documents = [];

  ngOnInit(): void {
      this.showDetails = false;
      this._showDocs = false;
    this.profileService.reloadAppliedOffers();
  }

  constructor(
    private offersService: OffersService,
    private toastService: ToastService,
    private applicationService: ApplicationService,
    private profileService: ProfileService) {
  }

  set showDetails(show: boolean) {
    this._showDetails = show;
    this.getDetailsFromInput();
  }

  get showDetails(): boolean {
    return this._showDetails;
  }

  handleApply() {
    if (this._showDocs) {
        console.log("Sending application...");
        //Sent
        let documentsSent = [];
        this.documents.forEach((doc) => {
            if(doc.checked)
                documentsSent.push(doc.url);
        });
        try{
        this.applicationService.createApplication(
            this.profileService.getLogin(), this.offer.company, this.offer.id, { "files": documentsSent}).subscribe((res) => { console.log(res);this.profileService.reloadAppliedOffers(); });
        } catch (e) {
            this.profileService.reloadAppliedOffers();
        }
        this.toastService.show('Application successfully sent!');
        this.profileService.reloadAppliedOffers();
        this.applied$.next(true);
    } else { // click on APPLY
      this.profileService.loadCVs().subscribe((result) => {
        this.documents = JSON.parse(JSON.stringify(result));
      });
    }
    
    this._showDocs = true;
  }

  get showDocs(): boolean {
    return this._showDocs;
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
