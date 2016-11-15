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
    </md-sidenav-layout>
    <span class="app-action">
      <button md-fab><md-icon>check circle</md-icon></button>
    </span>
  `,
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent { }
