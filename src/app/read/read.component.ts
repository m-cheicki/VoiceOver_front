import { Component, OnInit } from '@angular/core';
import { Cards } from '../interfaces/card';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  cards: any;

  constructor() { }

  ngOnInit(): void {
    this.cards = Cards;
  }

}
