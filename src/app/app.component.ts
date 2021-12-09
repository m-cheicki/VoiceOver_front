import { Component } from '@angular/core';
import { Cards } from './interfaces/card';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VoiceOver';
  cards = Cards;

}
