import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'edit-card',
  templateUrl: './edit-card.component.html'
})

export class EditCardComponent implements OnInit {
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

  editCard(): void {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.card.deck && this.card.front && this.card.back) {
      this.dataService.editCard(this.card);
      this.successMessage = "Card edited successfuly."
    } else {
      this.errorMessage = "Fields cannot be left empty.";
    }
  }

  goBack(): void {
    this.location.back();
  }
}
