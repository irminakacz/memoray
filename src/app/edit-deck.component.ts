import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { DataService } from './data.service';
import { Deck } from './deck';

@Component({
  selector: 'edit-deck',
  templateUrl: './edit-deck.component.html'
})

export class EditDeckComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  deck: Deck;

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
    .subscribe(deck => this.deck = deck);
  }

  editDeck(): void {
    if (this.deck.name) {
      this.dataService.editDeck(this.deck);
      this.successMessage = "Deck edited successfuly."
    } else {
      this.errorMessage = "Fields cannot be left empty.";
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/deck-list']);
  }
}
