import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  #layout-profile {
    display: flex; 
    flex-flow:row wrap;
  }
  .flexbox-container {
    display: flex;
  }
  .flexbox-container > div {
    width: 50%;
    padding: 10px;
  }
  `]
})

export class ProfileComponent { }

