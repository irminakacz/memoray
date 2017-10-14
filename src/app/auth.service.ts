import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { DataService } from './data.service';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  token: string;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  login(): Promise<boolean> {
    let username = "mina";
    let password = "kOliberek6";
    return this.dataService.authenticateUser(username, password)
    .then(response => {
      this.token = JSON.parse(response['_body']).token;
      if (this.token) {
        this.isLoggedIn = true;
      }
      return true;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
