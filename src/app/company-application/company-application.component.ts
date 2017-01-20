import { Component, ViewContainerRef, Input, Output, EventEmitter} from '@angular/core';
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
    @Output() acceptFct: EventEmitter<any> = new EventEmitter();
    @Output() refuseFct: EventEmitter<any> = new EventEmitter();

    documents = [
        {id: 1, title: 'New Grad.pdf', url: 'http://etud.insa-toulouse.fr/~papailha/papailhau/file/Resume Arthur Papailhau.pdf'},
    ];

    openButtonClicked(url) {
      window.open(url);
    }

    accepteButtonClicked() {
        this.acceptFct.emit([]);
    }

    refuseButtonClicked() {
      this.refuseFct.emit([]);
    }

    showDocument = false;
  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef) {}
}
