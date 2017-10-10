import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Card } from './card';

@Injectable()
export class DataService {
  private apiUrl = 'http://localhost:8000';

  constructor(
    private http: Http
  ) { }

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
