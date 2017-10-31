import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Deck } from './deck';
import { DataService } from './data.service';

@Component({
  selector: 'deck-list',
  templateUrl: './deck-list.component.html'
})

export class DeckListComponent implements OnInit {
  decks: Deck[];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks(): void {
    this.dataService.getDecks().then(decks => this.decks = decks);
  }

  getDueCards(deck: Deck): number {
    return deck.cards.filter(card => card.is_due).length;
  }

  goToDeck(id: number) {
    this.router.navigate(['/menu/deck', id]);
  }

  createDeck() {
    this.router.navigate(['/menu/add-deck']);
  }

  editDeck(id: number) {
    this.router.navigate(['/menu/edit-deck', id]);
  }

  deleteDeck(id: number) {
    this.router.navigate(['/menu/delete-deck', id]);
  }
}
