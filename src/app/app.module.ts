import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTuneComponent } from './add-tune/add-tune.component';
import { TuneListComponent } from './tunes-list/tunes-list.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { TuneCardComponent } from './tune-card/tune-card.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AddDiscussionComponent } from './discussion/add-discussion/add-discussion.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTuneComponent,
    TuneListComponent,
    StarRatingComponent,
    TuneCardComponent,
    DiscussionComponent,
    AddDiscussionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
