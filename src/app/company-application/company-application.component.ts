import { Component, ViewContainerRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-company-application',
  templateUrl: 'company-application.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class CompanyApplicationComponent implements OnInit{

    @Input() application;
    @Output() application_changed = new EventEmitter() ;

    documents = [
    ];

    ngOnInit() {
        let files = this.application.files.replace(/u'/g, "'").replace(/'/g, '"');
        files = JSON.parse(files);
        try{
        for (let doc_url of files)
        {
            this.documents.push({title:doc_url.split('/').slice(-1)[0] , url: doc_url});
        }}catch(e){}
    }

    showDocument = false;

    acceptApplication(){
        if(this.application.state == 'wait_for_company'){
            this.applicationService
            .setApplication(this.application.login, this.application.company, this.application.offer, {state: "wait_for_internship_office"})
            .subscribe((result) => {
                console.log(JSON.stringify("Application Accepted :)"));
                this.application_changed.emit();
            }).catch((err) => {
                console.log(JSON.stringify("Application Accepted :)"));
                this.application_changed.emit();
            });
        }
    }
    
    refuseApplication(){
        this.applicationService
        .setApplication(this.application.login, this.application.company, this.application.offer, {state: "refused"})
        .subscribe((result) => {
            console.log(JSON.stringify("Application Refused :("));
            this.application_changed.emit();
        }).catch((err) => {
            console.log(JSON.stringify("Application Refused :("));
            this.application_changed.emit();
        });
    }

  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef, private applicationService: ApplicationService) {
  }
}
