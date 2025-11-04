import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { StarsReview } from '../stars-review/stars-review';

@Component({
  selector: 'review-component',
  imports: [DatePipe, StarsReview],
  templateUrl: './review.html',
  styles: ``,
})
export class Review {
  name = input.required<string>();
  date = input.required<Date>();
  rating = input.required<number>();
  review = input.required<string>();

  stars: number[] = [];
  filledStars: number[] = [];

  ngOnInit() {
    this.stars = Array.from({ length: 5 - this.rating() }, (_, i) => i + 1);
    this.filledStars = Array.from({ length: this.rating() }, (_, i) => i + 1);
  }
}
