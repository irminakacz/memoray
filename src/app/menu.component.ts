import { Component } from '@angular/core';

@Component({
  selector: 'main-menu',
  template: `
    <div class="container" style="padding: 1em">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" 
            routerLink="/menu/deck-list"
            routerLinkActive="active">Decks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
            routerLink="/menu/add-card"
            routerLinkActive="active">Add</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/deck-list">Browse</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/deck-list">Statistic</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/deck-list">Settings</a>
        </li>
      </ul>
      <router-outlet></router-outlet>
    </div>
  `,
})

export class MenuComponent {
}
