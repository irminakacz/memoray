import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Card } from './card';

@Injectable()
export class DataService {
  private apiUrl: string;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    if (environment.production) {
      this.apiUrl = 'https://memoray-api.herokuapp.com';
    } else {
      this.apiUrl = 'http://localhost:8000'
    }
  }

  authenticateUser(username: string, password: string) {
    let data = {'username': username, 'password': password};
    return this.http.post(
      this.apiUrl + '/memoray-auth/', 
      JSON.stringify(data), 
      {headers: this.headers})
    .toPromise()
  }

  getCards(): Promise<Card[]> {
    return this.http.get(this.apiUrl + '/cards/')
    .toPromise()
    .then(response => response.json() as Card[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
