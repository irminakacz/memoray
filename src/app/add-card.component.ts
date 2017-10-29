import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'add-card',
  template: `
    <div class="container" style="padding: 2em">

      <div class="row">

        <div class="col-1">
        </div>

        <div class="col-10">
          <h2>Add card</h2>

          <div *ngIf="errorMessage"
            class="alert alert-danger" 
            role="alert">{{errorMessage}}</div>

          <div *ngIf="successMessage"
            class="alert alert-success" 
            role="alert">{{successMessage}}</div>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Deck
            </label>
            <div class="col-sm-10">
              <select class="form-control" [(ngModel)]="card.deck">
                <option *ngFor="let deck of decks"
                  [value]="deck.id">{{deck.name}}</option>
              </select>
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
                [(ngModel)]="card.front">
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
                [(ngModel)]="card.back">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="button" 
                class="btn btn-dark"
                (click)="createCard()">Create</button>
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
