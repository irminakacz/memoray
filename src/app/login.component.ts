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

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).then(() => {
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl 
            ? this.authService.redirectUrl : '/menu/deck-list';
          this.router.navigate([redirect]);
        } else {
          this.errorMessage = "Incorrect username or password.";
        }
      });
    } else {
      this.errorMessage = "Fields cannot be empty.";
    }
  }

  logout() {
    this.authService.logout();
  }

  createUser(): void {
    this.router.navigate(['/add-user']);
  }
}
