import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-layout>
      <md-toolbar color="primary">
        Internsheep
        <span class="app-toolbar-filler"></span>
      </md-toolbar>
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>
      <div id="snackbar"></div>
    </md-sidenav-layout>
  `,
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent { }
