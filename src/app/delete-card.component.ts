import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'edit-card',
  template: `
    <div class="container" style="padding: 2em">

      <div class="row" *ngIf="card">

        <div class="col-1">
        </div>

        <div class="col-10">
          <h2>Delete card</h2>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Deck
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="deck"
                [(ngModel)]="card.deck"
                disabled>
            </div>
          </div>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Front
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="front"
                [(ngModel)]="card.front"
                disabled>
            </div>
          </div>

          <div class="form-group row">
            <label for="back" class="col-sm-2 col-form-label">
              Back
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="back"
                [(ngModel)]="card.back"
                disabled>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="button" 
                class="btn btn-dark"
                (click)="deleteCard()">Delete</button>
              <button type="button"
                class="btn btn-light"
                (click)="goBack()">Cancel</button>
            </div>
          </div>
        </div>

        <div class="col-1">
        </div>

      </div>
    </div>
  `
})

export class DeleteCardComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  card: Card;
  decks: Deck[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
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
      () => this.router.navigate(['/menu/review', this.card.deck]),
      200);
  }

  goBack(): void {
    this.router.navigate(['/menu/review', this.card.deck]);
  }
}
