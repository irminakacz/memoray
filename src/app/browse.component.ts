import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Deck } from './deck';
import { Card } from './card';
import { DataService } from './data.service';

@Component({
  selector: 'browse',
  template: `
    <div class="container" style="padding: 2em">
      <h3>Browse cards</h3>

      <input id="search-box" 
        class="form-control"
        [(ngModel)]="searchPhrase"
        (keyup)="search()"
        placeholder="Search..."
        style="width: 100%">

      <table class="table table-hover" *ngIf="cards && decks">
        <thead>
          <tr>
            <th scope="col">Front</th>
            <th scope="col">Back</th>
            <th scope="col">Deck</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let card of searchResult">
            <td>{{card.front}}</td>
            <td>{{card.back}}</td>
            <td>{{this.getDeckName(card.deck)}}</td>
            <td>
              <button class="btn btn-secondary"
                (click)="this.editCard(card.id)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-secondary"
                (click)="this.deleteCard(card.id)">
              <i class="fa fa-times" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})

export class BrowseComponent implements OnInit {
  decks: Deck[];
  cards: Card[];
  searchResult: Card[];
  searchPhrase: string;


  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
    this.getCards();
  }

  getDecks(): void {
    this.dataService.getDecks().then(decks => this.decks = decks);
  }

  getCards(): void {
    this.dataService.getCards().then(cards => {
      this.cards = cards;
      this.searchResult = this.cards;
    });
  }

  getDeckName(id: number) {
    return this.decks.find(deck => deck.id === id).name;
  }

  search(): void {
    if (this.searchPhrase.length === 0) {
      this.searchResult = this.cards;
    } else {
      this.searchPhrase = this.searchPhrase.toLowerCase();
      this.searchResult = this.cards.filter(card => {
        return card.front.toLowerCase().includes(this.searchPhrase) || 
          card.back.toLowerCase().includes(this.searchPhrase) || 
          this.getDeckName(card.deck).toLowerCase().includes(this.searchPhrase)
      });
    }
  }

  editCard(id: number): void {
    this.router.navigate(['/menu/edit-card', id]);
  }

  deleteCard(id: number): void {
    this.router.navigate(['/menu/delete-card', id]);
  }
}
