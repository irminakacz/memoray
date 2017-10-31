import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'edit-card',
  templateUrl: './delete-card.component.html'
})

export class DeleteCardComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  card: Card;
  decks: Deck[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDecks();
    this.getCard();
  }

  getCard(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.dataService.getCard(+params['id']))
    .subscribe(card => this.card = card);
  }

  getDecks(): void {
    this.dataService.getDecks()
    .then(decks => this.decks = decks);
  }

  deleteCard(): void {
    this.dataService.deleteCard(this.card);
    setTimeout(
      () => this.location.back(),
      200);
  }

  getDeckName() {
    return this.decks.find(deck => deck.id === this.card.deck).name;
  }

  goBack(): void {
    this.location.back();
  }
}
