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

  createUser(): string {
    if (this.fieldsEmpty()) 
      return this.errorMessage = "Fields cannot be empty.";
    if (this.passwordTooShort()) 
      return this.errorMessage = "Password too short.";
    if (this.passwordsNotMatch()) 
      return this.errorMessage = "Passwords don't match.";
    this.dataService.createUser(this.username, this.password)
      .then(() => this.successMessage = "Account created successfuly.")
      .catch(() => this.errorMessage = "This user already exist.")
  }

  goBack(): void {
    this.router.navigate(['/menu/deck-list']);
  }

  fieldsEmpty(): boolean {
    return !(this.username && this.password && this.repeatedPassword);
  }

  passwordTooShort(): boolean {
    return this.password.length < 6;
  }

  passwordsNotMatch(): boolean {
    return this.password !== this.repeatedPassword;
  }
}
