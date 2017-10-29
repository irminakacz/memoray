import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { DeckListComponent } from './deck-list.component';
import { DeckComponent } from './deck.component';
import { LoginComponent } from './login.component';
import { ReviewComponent } from './review.component';
import { AddCardComponent } from './add-card.component';
import { AddDeckComponent } from './add-deck.component';
import { EditDeckComponent } from './edit-deck.component';
import { DeleteDeckComponent } from './delete-deck.component';
import { EditCardComponent } from './edit-card.component';
import { DeleteCardComponent } from './delete-card.component';
import { BrowseComponent } from './browse.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu/deck-list', pathMatch: 'full' },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        children: [
          { path: 'deck-list', component: DeckListComponent },
          { path: 'deck/:id', component: DeckComponent },
          { path: 'review/:id', component: ReviewComponent },
          { path: 'add-card', component: AddCardComponent },
          { path: 'add-deck', component: AddDeckComponent },
          { path: 'edit-deck/:id', component: EditDeckComponent },
          { path: 'delete-deck/:id', component: DeleteDeckComponent },
          { path: 'edit-card/:id', component: EditCardComponent },
          { path: 'delete-card/:id', component: DeleteCardComponent },
          { path: 'browse', component: BrowseComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
    AuthService
  ]
})

export class AppRoutingModule { }
