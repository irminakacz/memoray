import { Component, OnInit } from '@angular/core';

import { Card } from './card';
import { DataService } from './data.service';

@Component({
  selector: 'deck-list',
  template: `
    <h3>Cards</h3>
    <ul>
      <li *ngFor="let card of cards">
        {{card.id}} {{card.front}} {{card.back}} {{card.is_due}} {{card.deck}}
      </li>
    </ul>
  `,
})

export class DeckListComponent implements OnInit {
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
