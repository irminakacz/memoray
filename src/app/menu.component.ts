import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  template: `
    <nav>
      <a routerLink="/deck-list">Decks</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})

export class MenuComponent {
}
