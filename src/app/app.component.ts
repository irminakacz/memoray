import { Component, OnInit } from '@angular/core';

import { Card } from './card';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h3>Cards</h3>
    <ul>
      <li *ngFor="let card of cards">
        {{card.id}} {{card.front}} {{card.back}} {{card.is_due}}
      </li>
    </ul>
  `,
})

export class AppComponent implements OnInit {
  title = 'MemoRay';
  cards: Card[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.dataService.getCards().then(cards => this.cards = cards);
  }
}
