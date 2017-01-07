import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { Ng2UploaderModule } from 'ng2-uploader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { StarredOffersComponent } from './starred-offers/starred-offers.component';
import { OffersComponent } from './offers/offers.component';
import { FilesManagerComponent } from './files-manager/files-manager.component';
import { ChatComponent } from './chat/chat.component';
import { PendingConventionsComponent } from './pending-conventions/pending-conventions.component';
import { PendingConventionsDetailComponent, PendingConventionsDialogComponent } from './pending-conventions-detail/pending-conventions-detail.component';
import { CompanyApplicationsComponent } from './company-applications/company-applications.component';
import { CompanyApplicationComponent } from './company-application/company-application.component';
// import { PendingConventionsDialogComponent } from './_dialog/pending-conventions-dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { ProfileCompanyComponent } from './profile_company/profile-company.component';
import { CompanyOffersComponent } from './company-offers/company-offers.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

import { UserService } from './_services/user.service';
import { ProfileService } from './_services/profile.service';
import { RoutingService } from './_services/routing.service';
import { ToastService } from './_services/toast.service';
import { OffersService } from './_services/offers.service';
import { ChatService } from './_services/chat.service';

import { LoggedInGuard } from './_guards/logged-in.guard';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { MyFilterOffersPipe } from './_pipe/filter-offers.pipe';

// http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial#auth-guard-ts
// https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.d63ancvls

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    ProfileInfoComponent,
    StarredOffersComponent,
    OffersComponent,
    MyFilterOffersPipe,
    FilesManagerComponent,
    ProfileCompanyComponent,
    CompanyOffersComponent,
    CompanyInfoComponent,
    OfferDetailComponent,
    PendingConventionsComponent,
    PendingConventionsDetailComponent,
    PendingConventionsDialogComponent,
    CompanyApplicationsComponent,
    CompanyApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    Ng2UploaderModule
  ],
  providers: [
    UserService,
    ProfileService,
    RoutingService,
    ChatService,
    ToastService,
    OffersService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    LoggedInGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [PendingConventionsDialogComponent]
})
export class AppModule { }
