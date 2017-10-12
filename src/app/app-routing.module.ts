import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DeckListComponent } from './deck-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/deck-list', pathMatch: 'full' },
  { path: 'deck-list', component: DeckListComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
