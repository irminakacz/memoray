import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Deck } from './deck';

@Component({
  selector: 'add-deck',
  templateUrl: './add-deck.component.html'
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
