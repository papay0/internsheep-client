import { Component, ViewContainerRef, Input} from '@angular/core';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-company-application',
  templateUrl: 'company-application.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class CompanyApplicationComponent {

    @Input() application;

    documents = [
        {id: 1, title: 'Resume_Airbus_Juan_Carlitos', url: 'https://www.u-paris2.fr/sites/default/files/pdf.pdf'},
        {id: 2, title: 'Cover_Letter_Airbus_Juan_Carlitos', url: 'https://www.u-paris2.fr/sites/default/files/pdf.pdf'}
    ];

    showDocument = false;
  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef) {}
}
