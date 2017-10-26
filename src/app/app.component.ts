import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-dark bg-dark">

      <a class="navbar-brand"
        routerLink="/menu/deck-list"
        routerLinkActive="active">MemoRay</a>

      <button *ngIf="authService.isLoggedIn"
        class="btn btn-sm align-right btn-outline-secondary"
        (click)="authService.logout()"
        type="button">Logout</button>

    </nav>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent {

  constructor(public authService: AuthService) { }

}
