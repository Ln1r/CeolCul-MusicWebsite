// Star-Rating.Component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() tuneId: string = '';
  @Input() starIdPrefix: string = '';
  currentRating: number = 0;
  ratings: number[] = [];
  chosenRates: number[] =[0,0,0,0,0];// Initialize counts to 0 for each star rating

  handleClick(rating: number) {
    this.currentRating = rating;
    this.ratings.push(rating);
    this.chosenRates[rating -1]++;
    
    const data ={
      ratings: this.ratings,
      chosenRates: this.chosenRates
    };
    
    localStorage.setItem(`ratings-${this.tuneId}-${this.getStarId()}`, JSON.stringify(data));
  }
  calculateAverageRating() {
    const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / this.ratings.length;
    return average.toFixed(1);
  }

// retrieve the ratings
  ngOnInit() {
    const storedData = localStorage.getItem(`ratings-${this.tuneId}-${this.getStarId()}`);
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.ratings && data.chosenRates) {
        this.ratings = data.ratings;
        this.chosenRates = data.chosenRates;
        this.currentRating = this.ratings[this.ratings.length - 1];
      }
    }
  }

  private getStarId(): string{
    const starId = this.starIdPrefix + '-star';
    return starId;
  }
}