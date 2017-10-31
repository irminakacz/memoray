import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DataService } from './data.service';
import { Deck } from './deck';

@Component({
  selector: 'delete-deck',
  templateUrl: './delete-deck.component.html'
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
