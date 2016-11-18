import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './_services/user.service';
import { ProfileService } from './_services/profile.service';
import { RoutingService } from './_services/routing.service';
import { ToastService } from './_services/toast.service';

import { LoggedInGuard } from './_guards/logged-in.guard';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial#auth-guard-ts
// https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.d63ancvls

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    UserService,
    ProfileService,
    RoutingService,
    ToastService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
