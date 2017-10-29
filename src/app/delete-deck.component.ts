import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DataService } from './data.service';
import { Deck } from './deck';

@Component({
  selector: 'delete-deck',
  template: `
    <div class="container" style="padding: 2em">

      <div class="row" *ngIf="deck">

        <div class="col-1">
        </div>

        <div class="col-10">
          <h2>Delete deck</h2>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="name"
                [(ngModel)]="deck.name"
                disabled>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="button" 
                class="btn btn-dark"
                (click)="deleteDeck()">Delete</button>
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

export class DeleteDeckComponent implements OnInit {
  deck: Deck;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDeck();
  }

  getDeck(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.dataService.getDeck(+params['id']))
    .subscribe(deck => this.deck = deck);
  }

  deleteDeck(): void {
    this.dataService.deleteDeck(this.deck);
    setTimeout(
      () => this.location.back(),
      200);
  }

  goBack(): void {
    this.location.back();
  }
}
