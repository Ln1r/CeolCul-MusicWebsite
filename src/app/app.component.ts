import { Component, ViewChild } from '@angular/core';
import { TuneListComponent } from './tunes-list/tunes-list.component';
import { Discussion } from './Api-services/site-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TuneListComponent) tuneListComponent!: TuneListComponent;

  title = 'my-app';
  addTuneVisible = false;
  addDiscussionVisible = false;

  constructor() {}

// OPEN TUNE LISTS VIA BUTTONS
  harpTune(): void {
    this.tuneListComponent.harpTune();
  }fiddleTune(){
    this.tuneListComponent.fiddleTune();
  }accordionTune(){
    this.tuneListComponent.accordionTune();
  }
// ADD TUNE
  showAddTune() {
    this.addTuneVisible = !this.addTuneVisible;
  }

// ADD DISCUSSION
  showAddDiscussion(){
    this.addDiscussionVisible = !this.addDiscussionVisible;
  }
  discussions: Discussion[]=[];
  onDiscussionAdded(discussions: Discussion[]) {
    this.discussions = discussions;
    this.addDiscussionVisible = false;
  }
}
