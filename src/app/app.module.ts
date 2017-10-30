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
import { AddDeckComponent } from './add-deck.component';
import { EditDeckComponent } from './edit-deck.component';
import { DeleteDeckComponent } from './delete-deck.component';
import { EditCardComponent } from './edit-card.component';
import { DeleteCardComponent } from './delete-card.component';
import { BrowseComponent } from './browse.component';
import { AddUserComponent } from './add-user.component';
import { EditUserComponent } from './edit-user.component';
import { StatsComponent } from './stats.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DeckListComponent,
    LoginComponent,
    DeckComponent,
    ReviewComponent,
    AddCardComponent,
    AddDeckComponent,
    EditDeckComponent,
    DeleteDeckComponent,
    EditCardComponent,
    DeleteCardComponent,
    BrowseComponent,
    AddUserComponent,
    EditUserComponent,
    StatsComponent
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
