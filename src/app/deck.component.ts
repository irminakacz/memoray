import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Deck } from './deck';
import { DataService } from './data.service';

@Component({
  selector: 'deck',
  template: `
    <div class="container" style="padding: 2em">
      <div *ngIf="deck">
        <h2>{{deck.name}}</h2> 
        <div *ngIf="dueCards">
          <div>Cards to study: {{dueCards}}
          <button class="btn btn-secondary btn-sm" 
            style="margin-left: 1em"
            (click)="this.reviewDeck()">Review</button>
          </div>
        </div>
        <div *ngIf="!dueCards">
          Congratulations! No more cards to review!
        </div>
      </div>
    </div>
  `,
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
