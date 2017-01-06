import { Component, OnInit } from '@angular/core';
import { OffersService } from '../_services/offers.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pending-conventions',
  templateUrl: './pending-conventions.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class PendingConventionsComponent implements OnInit {
    convention1 = {id: 1, description: 'Blablabla', name: 'Arthur Papailhau', company: 'Sigfox'};
    convention2 = {id: 1, description: 'Blablabla', name: 'Arthur Papailhau', company: 'Sigfox'};
    convention3 = {id: 1, description: 'Blablabla', name: 'Arthur Papailhau', company: 'Sigfox'};
    convention4 = {id: 1, description: 'Blablabla', name: 'Arthur Papailhau', company: 'Sigfox'};
    convention5 = {id: 1, description: 'Blablabla', name: 'Arthur Papailhau', company: 'Sigfox'};
    conventions = [this.convention1, this.convention2, this.convention3, this.convention4, this.convention5];

    _conventionState = 'Pending conventions';
    selectedIndex: number = 0;
    stateLabel = ['Pending conventions', 'Accepted conventions', 'Refused conventions'];

  ngOnInit() {
  }

  constructor(private offersService: OffersService, private router: Router) { }
}
