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

  constructor(private dataService: DataService, private router: Router) { 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
  }

  login(username: string, password: string): Promise<boolean> {
    return this.dataService.authenticateUser(username, password)
    .then(response => {
      this.token = JSON.parse(response['_body']).token;
      if (this.token) {
        localStorage.setItem('token', this.token);
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
      }
      return true;
    }).catch(() => this.isLoggedIn = false);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
