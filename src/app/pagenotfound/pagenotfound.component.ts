import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  public message: string = 'hidden-message';

  constructor() { }

  ngOnInit(): void {
    this.showMessage();
  }

  public showMessage(): void {
    setTimeout(() => this.message = 'show', 2000);
  }

}
