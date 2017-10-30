import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { Deck } from './deck';
import { Card } from './card';
import { Review } from './review';

@Component({
  selector: 'stats',
  template: `
    <div class="container" style="padding: 2em">
      <div *ngIf="reviews && cards && decks">
        <h2>Statistics</h2> 
        <div>
          Number of cards in all decks: {{cards.length}}
          Overall number of reviews: {{reviews.length}}
        </div>
        <br>
        <div>
          Cards per deck:
          <ul>
            <li *ngFor="let deck of decks">
              {{deck.name}}: {{deck.cards.length}}
            </li>
          </ul>
        </div>
        <div>
          Answers quality:
          <ul>
            <li>0: {{this.getNumberOfAnswersWithGivenQuality(0)}}</li>
            <li>1: {{this.getNumberOfAnswersWithGivenQuality(1)}}</li>
            <li>2: {{this.getNumberOfAnswersWithGivenQuality(2)}}</li>
            <li>3: {{this.getNumberOfAnswersWithGivenQuality(3)}}</li>
            <li>4: {{this.getNumberOfAnswersWithGivenQuality(4)}}</li>
            <li>5: {{this.getNumberOfAnswersWithGivenQuality(5)}}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})

export class StatsComponent implements OnInit {
  reviews: Review[];
  cards: Card[];
  decks: Deck[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.getCards();
    this.getDecks();
  }

  getReviews(): void {
    this.dataService.getReviews()
    .then(reviews => this.reviews = reviews);
  }

  getCards(): void {
    this.dataService.getCards()
    .then(cards => this.cards = cards);
  }

  getDecks(): void {
    this.dataService.getDecks()
    .then(decks => this.decks = decks);
  }

  getNumberOfAnswersWithGivenQuality(quality: number) {
    return this.reviews.filter(review => review.answer_quality === quality).length
  }
}
