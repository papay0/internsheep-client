import { Component, Input } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Offer } from '../_model/Offer';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
export class OfferDetailComponent {

	@Input() offer : Offer;
	months = ["January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",];
    _showDetails: boolean = false;
    _loaded: boolean = false;



	ngOnInit(): void {
		console.log("blha1: " + JSON.stringify(this.offer))
		if(!this.offer.id) // dedicated page
			this.showDetails = true;
	}

	constructor(private offersService: OffersService, private route: ActivatedRoute) { 
		this.offer = new Offer;
	}

	set showDetails(show: boolean) {
		if(show) {
			this._showDetails = true;
			if(!this._loaded) {
				console.log("blha2: " + JSON.stringify(this.offer))
				if(this.offer.id)
					this.getDetailsFromInput();
				else
					this.getDetailsFromUrl();
				this._loaded = true;
			}
		}
		else
			this._showDetails = false;
	}

	get showDetails(): boolean {
		return this._showDetails;
	}

	getDetailsFromInput(): void {
		this.offersService.getOffersDetails(this.offer.id)
		.subscribe(details => this.offer = details);
	}

	getDetailsFromUrl(): void {
		this.route.params
		.switchMap((params: Params) => this.offersService.getOffersDetails(+params['id']))
		.subscribe(details => this.offer = details);
	}

	getStart(): string {
		return this.months[this.offer.start];
	}

	isLoaded(): boolean {
		return (!!this.offer);
	}

}