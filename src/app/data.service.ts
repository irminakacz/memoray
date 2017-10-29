import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Card } from './card';
import { Deck } from './deck';

@Injectable()
export class DataService {
  private apiUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    if (environment.production) {
      this.apiUrl = 'https://memoray-api.herokuapp.com';
    } else {
      this.apiUrl = 'http://localhost:8000'
    }

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    });
  }

  authenticateUser(username: string, password: string) {
    let data = {'username': username, 'password': password};
    return this.http.post(
      this.apiUrl + '/memoray-auth/', 
      JSON.stringify(data), 
      {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  review(id: number, answerQuality: number): void {
    let data = {
      'card': id,
      'answer_quality': answerQuality
    }
    this.http.post(this.apiUrl + `/reviews/`, 
      JSON.stringify(data), {headers: this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  getCard(id: number): Promise<Card> {
    return this.http.get(this.apiUrl + `/cards/${id}/`, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Card)
    .catch(this.handleError);
  }

  getCards(): Promise<Card[]> {
    return this.http.get(this.apiUrl + `/cards/`, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Card[])
    .catch(this.handleError)
  }

  createCard(card: Card): void {
    let data = {
      "deck": card.deck,
      "front": card.front,
      "back": card.back
    }
    this.http.post(this.apiUrl + `/cards/`, JSON.stringify(data), 
      {headers:this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  editCard(card: Card): Promise<Card> {
    let data = {
      "front": card.front,
      "back": card.back,
      "deck": card.deck
    }
    return this.http.patch(this.apiUrl + `/cards/${card.id}/`,
      JSON.stringify(data), {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Card)
    .catch(this.handleError);
  }

  deleteCard(card: Card): void {
    this.http.delete(this.apiUrl + `/cards/${card.id}/`, {headers: this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  getDeck(id: number): Promise<Deck> {
    return this.http.get(this.apiUrl + `/decks/${id}/`, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Deck)
    .catch(this.handleError);
  }

  getDecks(): Promise<Deck[]> {
    return this.http.get(this.apiUrl + '/decks/', {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Deck[])
    .catch(this.handleError);
  }

  createDeck(deck: Deck): void {
    let data = {
      "name": deck.name
    }
    this.http.post(this.apiUrl + `/decks/`, JSON.stringify(data), 
      {headers:this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  editDeck(deck: Deck): Promise<Deck> {
    let data = {
      "name": deck.name
    }
    return this.http.patch(this.apiUrl + `/decks/${deck.id}/`,
      JSON.stringify(data), {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Deck)
    .catch(this.handleError);
  }

  deleteDeck(deck: Deck): void {
    this.http.delete(this.apiUrl + `/decks/${deck.id}/`,
      {headers: this.headers})
    .toPromise()
    .then()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
