import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'add-card',
  templateUrl: './add-card.component.html'
})

export class AddCardComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  card: Card;
  decks: Deck[];

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.card = new Card;
    this.getDecks();
  }

  getDecks(): void {
    this.dataService.getDecks()
    .then(decks => this.decks = decks);
  }

  createCard(): void {
    if (this.card.deck && this.card.front && this.card.back) {
      this.dataService.createCard(this.card);
      this.card = new Card;
      this.successMessage = "Card added successfuly."
    } else {
      this.errorMessage = "Fields cannot be left empty.";
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/deck-list']);
  }
}
