import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { ProfileCompanyComponent } from './profile_company/profile-company.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {PendingConventionsComponent } from './pending-conventions/pending-conventions.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'student/profile',  component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'company/profile',  component: ProfileCompanyComponent, canActivate: [LoggedInGuard] },
  { path: 'offers',  component: OffersComponent, canActivate: [LoggedInGuard] },
  { path: 'offer/:id', component: OfferDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'chat',  component: ChatComponent, canActivate: [LoggedInGuard] },
  { path: 'pending-conventions', component: PendingConventionsComponent, canActivate: [LoggedInGuard]},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
