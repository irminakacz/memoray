import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Deck } from './deck';

@Component({
  selector: 'add-deck',
  template: `
    <div class="container" style="padding: 2em">

      <div class="row">

        <div class="col-1">
        </div>

        <div class="col-10">
          <h2>Add deck</h2>

          <div *ngIf="errorMessage"
            class="alert alert-danger" 
            role="alert">{{errorMessage}}</div>

          <div *ngIf="successMessage"
            class="alert alert-success" 
            role="alert">{{successMessage}}</div>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="name"
                [(ngModel)]="deck.name">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="button" 
                class="btn btn-dark"
                (click)="createDeck()">Create</button>
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

export class AddDeckComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  deck: Deck;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.deck = new Deck;
  }

  createDeck(): void {
    if (this.deck.name) {
      this.dataService.createDeck(this.deck);
      this.deck = new Deck;
      this.successMessage = "Deck added successfuly."
    } else {
      this.errorMessage = "Fields cannot be left empty.";
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/deck-list']);
  }
}
