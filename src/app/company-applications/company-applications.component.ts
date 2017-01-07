import { Component, ViewContainerRef } from '@angular/core';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-company-applications',
  templateUrl: 'company-applications.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class CompanyApplicationsComponent {
    applications = [{id: 1, title: 'Airbus C++ Developer', description: 'blablabla', applicant: 'Juan Carlos'},
    {id: 1, title: 'Airbus C++ Developer', description: 'blablabla', applicant: 'Juan Carlos'},
    {id: 1, title: 'Airbus C++ Developer', description: 'blablabla', applicant: 'Juan Carlos'},
    {id: 1, title: 'Airbus C++ Developer', description: 'blablabla', applicant: 'Juan Carlos'},
    {id: 1, title: 'Airbus C++ Developer', description: 'blablabla', applicant: 'Juan Carlos'}];

  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef) {}
}
