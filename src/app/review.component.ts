import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Deck } from './deck';
import { Card } from './card';
import { DataService } from './data.service';

@Component({
  selector: 'review',
  template: `
    <div class="container" style="padding: 2em">
      <div *ngIf="deck">
        <h2>{{deck.name}}

        <div style="float: right">
          <button class="btn btn-secondary"
            (click)="this.editCard(this.dueCards[this.currentCard].id)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="btn btn-secondary"
            (click)="this.deleteCard(this.dueCards[this.currentCard].id)">
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        </h2> 

        <div class="container" 
          style="text-align: center; 
          border: solid 2px black;
          border-radius: 10px;
          padding: 2em">

          <h4>{{dueCards[currentCard].front}}</h4>

          <button class="btn btn-primary" 
            *ngIf="answerHidden; else answerVisible"
            (click)="showAnswer()">Show answer</button>

          <ng-template #answerVisible>
            <hr>
            <h4>{{dueCards[currentCard].back}}</h4>
            <div class="btn-group">
              <button class="btn btn-danger"
              (click)="this.review(0)">0</button>
              <button class="btn btn-warning"
              (click)="this.review(1)">1</button>
              <button class="btn btn-secondary"
              (click)="this.review(2)">2</button>
              <button class="btn btn-success"
              (click)="this.review(3)">3</button>
              <button class="btn btn-info"
              (click)="this.review(4)">4</button>
              <button class="btn btn-primary"
              (click)="this.review(5)">5</button>
            </div>
          </ng-template>

        </div>

      </div>
    </div>
  `,
})

export class ReviewComponent implements OnInit {
  deck: Deck;
  dueCards: Card[];
  currentCard: number;
  answerHidden: boolean;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDeck();
    this.currentCard = 0;
    this.answerHidden = true;
  }

  getDeck(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.dataService.getDeck(+params['id']))
    .subscribe(deck => {
      this.deck = deck
      this.dueCards = this.getDueCards(deck);
      if (this.dueCards.length === 0) {
        this.router.navigate(['/menu/deck/', this.deck.id]);
      }
    });
  }

  getDueCards(deck: Deck): Card[] {
    return deck.cards.filter(card => card.is_due);
  }

  showAnswer(): void {
    this.answerHidden = false;
  }

  review(answerQuality: number): void {
    if (answerQuality < 3) {
      this.dataService.review(this.dueCards[this.currentCard].id, answerQuality);
      this.dueCards.push(this.dueCards[this.currentCard]);
    } else {
      this.dataService.review(this.dueCards[this.currentCard].id, answerQuality);
    }

    if (this.currentCard < this.dueCards.length-1) {
      this.answerHidden = true;
      this.currentCard += 1;
    } else {
      setTimeout(
        () => this.router.navigate(['/menu/deck', this.deck.id]),
        200
      );
    }
  }

  editCard(id: number): void {
    this.router.navigate(['/menu/edit-card/', id]);
  }

  deleteCard(id: number): void {
    this.router.navigate(['/menu/delete-card/', id]);
  }

}
