import { Component } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  title = 'app works!';
  isDarkTheme: boolean = false;
  slideToggleModel: boolean = false;

  myVar: boolean = false;
  

  foods: any[] = [
    {name: 'Pizza', rating: 'Excellent'},
    {name: 'Burritos', rating: 'Great'},
    {name: 'French fries', rating: 'Pretty good'},
  ];

  documents: any[] = [
    {title: 'Document 1', precision: '98% accurate'},
    {title: 'Document 2', precision: '95% accurate'},
    {title: 'Document 3', precision: '80% accurate'},
    {title: 'Document 4', precision: '15% accurate'},
    {title: 'Document 5', precision: '13% accurate'},
    {title: 'Document 6', precision: '9% accurate'},
    {title: 'Document 7', precision: '3% accurate'},
    {title: 'Document 8', precision: '2% accurate'},
  ];

  progress: number = 0;

  constructor() {
    // Update the value for the progress-bar on an interval.
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
  }
}
