import { Component, Input, OnInit  } from '@angular/core';
import { Discussion, Comment } from '../Api-services/site-model';
import { DiscussionService } from '../Api-services/discussion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  @Input() discussion!: Discussion;

  discussions: Discussion[] = this.discussionService.discussions;
  commentText: string = '';
  constructor(private discussionService: DiscussionService) {}

  ngOnInit(): void {
    if (this.discussion) {
      this.discussionService.getComments(this.discussion?.id || 0);
    }
  }
  addComment(discussion: Discussion, commentForm: NgForm): void {
    this.discussionService.addComment(discussion.id!, commentForm.value.commentText);
    commentForm.resetForm();
    setTimeout(() => {
      this.commentText = '';
    }, 0);
  }
  
  getComments(): Comment[] {
    if (this.discussion) {
      return this.discussionService.getComments(this.discussion?.id || 0);
    } else {
      return [];
    }
  }
  toggleComments(discussion: Discussion): void {
    if (discussion) {
      discussion.showComments = !discussion.showComments;
    }
  }
}