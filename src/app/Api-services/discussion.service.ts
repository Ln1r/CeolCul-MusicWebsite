import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Discussion, Comment } from './site-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private _discussions: Discussion[] = [];
  discussions$ = new BehaviorSubject<Discussion[]>(this._discussions);

  constructor() {
    const storedDiscussions = localStorage.getItem('discussions');
    if (storedDiscussions) {
      this._discussions = JSON.parse(storedDiscussions);
      this.discussions$.next(this._discussions);
    }
  }

  addDiscussion(discussion: Discussion): void {
    discussion.id = this._discussions.length + 1;
    discussion.timestamp = new Date();
    this._discussions.push(discussion);
    this.discussions$.next(this._discussions);
    this.saveDiscussions();
  }
  get discussions(): Discussion[] {
    return this._discussions;
  }

  addComment(discussionId: number, commentText: string): void {
    const discussion = this._discussions.find(d => d.id === discussionId);
    if (discussion) {
      const newComment: Comment = { text: commentText };
      if (!discussion.comments) {
        discussion.comments = [];
      }
      discussion.comments.push(newComment);
      this.discussions$.next(this._discussions);
      this.saveDiscussions();
    }
  }
  private saveDiscussions(): void {
    localStorage.setItem('discussions', JSON.stringify(this._discussions));
  }
  getComments(discussionId: number): Comment[] {
    const discussion = this._discussions.find(d => d.id === discussionId);
    if (discussion && discussion.comments) {
      return discussion.comments;
    }
    return [];
  }
  comments$(discussionId: number): Observable<Comment[]> {
    return this.discussions$.pipe(
      map(discussions => {
        const discussion = discussions.find(d => d.id === discussionId);
        if (discussion && discussion.comments) {
          return discussion.comments;
        }
        return [];
      })
    );
  }
}
