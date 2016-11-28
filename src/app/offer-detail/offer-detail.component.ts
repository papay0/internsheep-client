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
		#layout-profile {
			display: flex; 
			flex-flow:row wrap;
		}
		.flexbox-container {
			display: flex;
		}
		.flexbox-container > div {
			width: 50%;
			padding: 10px;
		}
		.offer-container{
			display:flex;
		}
		.offer-info-specs {
			flex: 1;
		}
		.offer-info-text {
			flex: 3;
		}
		`]
})
export class OfferDetailComponent {

	offer : Offer;
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

	@Input()
	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.offersService.getOffersDetails(+params['id']))
		.subscribe(details => {console.log("coucou, "+ details);this.offer = details});
	}

	constructor(private offersService: OffersService, private route: ActivatedRoute) { 
		this.offer = new Offer;
	}

	getStart(): string {
		return this.months[this.offer.start];
	}

	isLoaded(): boolean {
		return (!!this.offer);
	}

}