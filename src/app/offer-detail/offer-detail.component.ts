import { Component, Input } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Offer } from '../_model/Offer';
import { ActivatedRoute, Params } from '@angular/router';
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
export class OfferDetailComponent {

	@Input() offer: Offer;
	months = ['January',
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
		'December',];

	private _showDetails: boolean = false;
	private _loaded: boolean = false;
	private _showApply: boolean = true;
	private _applied: boolean = true;

	private documents = [];

	ngOnInit(): void {
		if (!this.offer.id) {
			this.showDetails = true;
			this.showApply = true;
		}
	}

	constructor(private offersService: OffersService, private route: ActivatedRoute, private toastService: ToastService, private profileService: ProfileService) {
		this.offer = new Offer;
	}

	set showDetails(show: boolean) {
		this._showDetails = show;
		if (show && !this._loaded) {
			if (this.offer.id)
				this.getDetailsFromInput();
			else
				this.getDetailsFromUrl();
			this._loaded = true;
		}
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
		this.offersService.getOffersDetails(this.offer.id)
			.subscribe(details => this.offer = details || this.offer);
	}

	getDetailsFromUrl(): void {
		this.route.params
			.switchMap((params: Params) => this.offersService.getOffersDetails(+params['id']))
			.subscribe(details => this.offer = details || this.offer);
	}

	getStart(): string {
		return this.months[this.offer.start];
	}

	isLoaded(): boolean {
		return (!!this.offer);
	}

}