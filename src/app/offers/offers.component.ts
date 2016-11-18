import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent {
  selectedIndex: number = 0;
  searchLabel = ['company name', 'job title', 'description'];
}
