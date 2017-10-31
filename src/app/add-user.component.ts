import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './data.service';

import { Card } from './card';
import { Deck } from './deck';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html'
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
