import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DeckListComponent } from './deck-list.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/deck-list',
        pathMatch: 'full'
      },
      {
        path: 'deck-list',
        component: DeckListComponent
      }
    ])
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
