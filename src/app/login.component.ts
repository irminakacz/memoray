import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
    <div class="container" style="margin-top: 2em">

      <div class="row">

        <div class="col-3">
        </div>

        <div class="col-6">
          <h2>Login</h2>

          <div *ngIf="errorMessage"
            class="alert alert-danger" 
            role="alert">{{errorMessage}}</div>

          <div class="form-group row">
            <label for="username" class="col-sm-3 col-form-label">
              Username
            </label>
            <div class="col-sm-9">
              <input type="text" 
                class="form-control" 
                id="username"
                [(ngModel)]="username">
            </div>
          </div>

          <div class="form-group row">
            <label for="password" class="col-sm-3 col-form-label">
              Password
            </label>
            <div class="col-sm-9">
              <input type="password" 
                class="form-control" 
                id="password"
                [(ngModel)]="password">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-3"></div>
            <div class="col-sm-9">
              <button type="button" 
                class="btn btn-dark"
                (click)="login()">Login</button>
              <button type="button"
                class="btn btn-link">Sign in</button>
            </div>
          </div>
        </div>

        <div class="col-3">
        </div>

      </div>
    </div>
  `
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
}
