import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'profile',  component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'offers',  component: OffersComponent, canActivate: [LoggedInGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
