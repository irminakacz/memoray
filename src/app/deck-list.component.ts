import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Deck } from './deck';
import { DataService } from './data.service';

@Component({
  selector: 'deck-list',
  template: `
    <div class="container col-sm-11" style="margin: 2em">
      <h3>Decks
      <button type="button" 
        class="btn btn-secondary btn-sm"
        (click)="createDeck()">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      </h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Deck name</th>
            <th scope="col">Due cards</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let deck of decks">
            <td (click)="this.goToDeck(deck.id)">{{deck.name}}</td>
            <td (click)="this.goToDeck(deck.id)">{{this.getDueCards(deck)}}</td>
            <td>
              <button class="btn btn-secondary"
                (click)="this.editDeck(deck.id)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-secondary">
              <i class="fa fa-times" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class DeckListComponent implements OnInit {
  decks: Deck[];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks(): void {
    this.dataService.getDecks().then(decks => this.decks = decks);
  }

  getDueCards(deck: Deck): number {
    return deck.cards.filter(card => card.is_due).length;
  }

  goToDeck(id: number) {
    this.router.navigate(['/menu/deck', id]);
  }

  createDeck() {
    this.router.navigate(['/menu/add-deck']);
  }

  editDeck(id: number) {
    this.router.navigate(['/menu/edit-deck', id]);
  }
}
