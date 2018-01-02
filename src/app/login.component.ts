import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  errorMessage: string;
  username: string;
  password: string;

  constructor(
    public authService: AuthService, 
    public router: Router
  ) { }

  login(): string {
    if (this.fieldsEmpty()) {
      return this.errorMessage = "Fields cannot be empty.";
    }

    this.authService.login(this.username, this.password)
      .then((response) => {
        if (response) {
          this.redirectUser();
        } else {
          return this.errorMessage = "Incorrect username or password.";
        }
      });
  }

  fieldsEmpty(): boolean {
    return !(this.username && this.password)
  }

  redirectUser(): void {
    let redirect = this.authService.redirectUrl 
    ? this.authService.redirectUrl : '/menu/deck-list';
    this.router.navigate([redirect]);
  }

  logout() {
    this.authService.logout();
  }

  createUser(): void {
    this.router.navigate(['/add-user']);
  }
}
