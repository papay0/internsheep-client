import { Component, ViewContainerRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { ApplicationService } from '../_services/application.service';
import { UserService } from '../_services/user.service';
import { BehaviorSubject } from 'rxjs';

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

    applicant$ = new BehaviorSubject({});
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

        this.userService.getInfoById(this.application.login)
            .subscribe((result) => {
                this.applicant$.next(result);
        });

    }

    was_accepted$ = new BehaviorSubject(false);
    was_refused$ = new BehaviorSubject(false);
    showDocument = false;

    acceptApplication(){
        if(this.application.state == 'wait_for_company'){
            try{
                console.log(JSON.stringify("Application Accepted :)"));
                this.was_accepted$.next(true);
                this.applicationService
                .setApplication(this.application.login, this.application.company, this.application.offer, {state: "wait_for_internship_office"})
                .subscribe((result) => {
                    console.log(JSON.stringify("Application Accepted :)"));
                    this.was_accepted$.next(true);
                });
            }catch(err){
                console.log(JSON.stringify("Application Accepted :)"));
                this.was_accepted$.next(true);
            }
        }
    }
    
    refuseApplication(){
        console.log(JSON.stringify("Application Refused :("));
        this.was_refused$.next(true);
        this.applicationService
        .setApplication(this.application.login, this.application.company, this.application.offer, {state: "refused"})
        .subscribe((result) => {
            console.log(JSON.stringify("Application Refused :("));
        })/*.catch((err) => {
            console.log(JSON.stringify("Application Refused :("));
        })*/;
    }

  constructor(private toastService: ToastService, private viewContainerRef: ViewContainerRef, private applicationService: ApplicationService, private userService : UserService) {
  }
}
