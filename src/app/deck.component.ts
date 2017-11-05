import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Deck } from './deck';
import { DataService } from './data.service';

@Component({
  selector: 'deck',
  templateUrl: './deck.component.html'
})

export class DeckComponent implements OnInit {
  deck: Deck;
  dueCards: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDeck();
  }

  getDeck(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.dataService.getDeck(+params['id']))
    .subscribe(deck => {
      this.deck = deck
      this.dueCards = this.getDueCards(deck);
    });
  }

  getDueCards(deck: Deck): number {
    return deck.cards.filter(card => card.is_due).length;
  }

  reviewDeck(): void {
    this.router.navigate(['/menu/review', this.deck.id]);
  }
}
