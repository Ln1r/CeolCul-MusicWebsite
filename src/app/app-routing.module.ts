import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTuneComponent } from './add-tune/add-tune.component';
import { TuneListComponent } from './tunes-list/tunes-list.component';
import { AddDiscussionComponent } from './discussion/add-discussion/add-discussion.component'

const routes: Routes = [
  //home -> add-tune
  { path: '', redirectTo: '/add-tune', pathMatch: 'full' },
  { path: 'add-tune', component: AddTuneComponent },
  { path: 'add-discussion', component: AddDiscussionComponent },
  //Tune List
  { path: 'tunes-list', component: TuneListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
