import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { AuthService } from './auth.service';

import { Card } from './card';
import { Deck } from './deck';
import { User } from './user';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html'
})

export class EditUserComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  user: User;
  username: string;
  password: string;
  repeatedPassword: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.dataService.getUser()
    .then(user => {
      this.user = user;
      this.username = user.username;
    });
  }

  editUser(): void {
    if (this.username && this.password && this.repeatedPassword) {
      if (this.password.length >= 6) {
        if (this.password === this.repeatedPassword) {
          this.dataService.editUser(
            this.user.id, this.username, this.password);
          this.successMessage = "Account edited successfuly.";
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

  deleteUser(): void {
    let isUserSure = confirm("Are you sure you want to delete your account?\n(You will lost all decks and cards in the process)");
    if (isUserSure) {
      this.dataService.deleteUser(this.user.id);
      this.authService.logout();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
