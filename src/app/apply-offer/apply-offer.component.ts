import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-apply-offer',
  templateUrl: 'apply-offer.component.html',
})
export class ApplyOfferDialogComponent {
  constructor(public dialogRef: MdDialogRef<ApplyOfferDialogComponent>) { }
}
