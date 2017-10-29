import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

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
          <h2>Edit card</h2>

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
                (click)="createCard()">Edit</button>
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

  createCard(): void {
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
