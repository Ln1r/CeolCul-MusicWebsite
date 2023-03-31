import { Component, EventEmitter, Output } from '@angular/core';
import { Discussion } from '../../Api-services/site-model';
import { DiscussionService } from '../../Api-services/discussion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent {
  @Output() discussionsAdded = new EventEmitter<Discussion[]>();
  newDiscussion = new Discussion('', '');

  constructor(private discussionService: DiscussionService, private router: Router) {}

  onSubmit() {
    if (this.newDiscussion.title.trim() && this.newDiscussion.description.trim()) {
      this.discussionService.addDiscussion(this.newDiscussion);
    }
    this.newDiscussion = new Discussion('', '');
  }

  addDiscussion(title: string, description: string, inputElement: HTMLInputElement) {
    if (!title.trim() || !description.trim()) {
      console.log('Please enter a discussion title and body.');
      return;
    }
    const newDiscussion = new Discussion(title.trim(), description.trim());
    this.discussionService.addDiscussion(newDiscussion);
    this.router.navigate(['/discussion'], { 
      queryParams: { 
        title: newDiscussion.title,
        description: newDiscussion.description,
      } 
    });
    inputElement.value = ''; // clear the text input
  }
}
