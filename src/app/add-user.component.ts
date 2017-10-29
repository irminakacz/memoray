import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'add-user',
  template: `
    <div class="container" style="padding: 2em">

      <div class="row">

        <div class="col-1">
        </div>

        <div class="col-10">
          <h2>Create account</h2>

          <div *ngIf="errorMessage"
            class="alert alert-danger" 
            role="alert">{{errorMessage}}</div>

          <div *ngIf="successMessage"
            class="alert alert-success" 
            role="alert">{{successMessage}}</div>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Username
            </label>
            <div class="col-sm-10">
              <input type="text" 
                class="form-control" 
                id="username"
                [(ngModel)]="username">
            </div>
          </div>

          <div class="form-group row">
            <label for="front" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" 
                class="form-control" 
                id="password"
                [(ngModel)]="password">
            </div>
          </div>

          <div class="form-group row">
            <label for="back" class="col-sm-2 col-form-label">
              Repeated password
            </label>
            <div class="col-sm-10">
              <input type="password" 
                class="form-control" 
                id="repeatedPassword"
                [(ngModel)]="repeatedPassword">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="button" 
                class="btn btn-dark"
                (click)="createUser()">Create</button>
              <button type="button"
                class="btn btn-link"
                (click)="goBack()">Login</button>
            </div>
          </div>
        </div>

        <div class="col-1">
        </div>

      </div>
    </div>
  `
})

export class AddUserComponent {
  errorMessage: string;
  successMessage: string;

  username: string;
  password: string;
  repeatedPassword: string;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  createUser(): void {
    if (this.username && this.password && this.repeatedPassword) {
      if (this.password.length >= 6) {
        if (this.password === this.repeatedPassword) {
          this.dataService.createUser(this.username, this.password);
          this.successMessage = "Account created successfuly.";
        } else {
          this.errorMessage = "Passwords don't match.";
        }
      } else {
        this.errorMessage = "Password too short.";
      }
    } else {
      this.errorMessage = "Fields cannot be empty.";
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/deck-list']);
  }
}
