import { Component, Input } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-pending-conventions-detail',
    templateUrl: 'pending-conventions-detail.component.html',
    styles: [`
        md-card {
            margin: 20px;
        }
        md-card-content {
            padding-left: 10px;
        }
        `]
})
export class PendingConventionsDetailComponent {
    @Input() convention;
    constructor(private offersService: OffersService, private route: ActivatedRoute) {
    }
}
