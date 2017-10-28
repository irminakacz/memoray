import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { DeckListComponent } from './deck-list.component';
import { DeckComponent } from './deck.component';
import { DataService } from './data.service';
import { LoginComponent } from './login.component';
import { ReviewComponent } from './review.component';
import { AddCardComponent } from './add-card.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DeckListComponent,
    LoginComponent,
    DeckComponent,
    ReviewComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
