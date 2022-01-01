import { Component, OnInit } from '@angular/core';
import { Cards } from '../interfaces/card';

@Component({
  selector: 'app-input-choice',
  templateUrl: './input-choice.component.html',
  styleUrls: ['./input-choice.component.css']
})
export class InputChoiceComponent implements OnInit {

  cards: any;

  constructor() { }

  ngOnInit(): void {
    this.cards = Cards;
  }

}
