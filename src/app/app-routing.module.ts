import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { DeckListComponent } from './deck-list.component';
import { LoginComponent } from './login.component';

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
          { path: 'deck-list', component: DeckListComponent }
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
