import { Component, input } from '@angular/core';
import { FilledStar } from '../../../../core/icons/filled-star/filled-star';
import { Star } from '../../../../core/icons/star/star';

@Component({
  selector: 'stars-review-component',
  imports: [FilledStar, Star],
  templateUrl: './stars-review.html',
  styles: ``,
})
export class StarsReview {
  filledStars = input.required<number[]>();
  stars = input.required<number[]>();
}
