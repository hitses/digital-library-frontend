import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilledStar } from '../../../../core/icons/filled-star/filled-star';
import { Star } from '../../../../core/icons/star/star';
import { EMAIL_PATTERN } from '../../../../core/patterns';

@Component({
  selector: 'create-review-form-component',
  imports: [ReactiveFormsModule, FilledStar, Star],
  templateUrl: './create-review-form.html',
  styles: ``,
})
export class CreateReviewForm {
  private readonly fb = inject(FormBuilder);

  stars = [1, 2, 3, 4, 5];
  hovered = 0;
  rating = 0;

  reviewForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    review: ['', Validators.required],
    rating: [0, Validators.required],
  });

  onHover(star: number): void {
    this.hovered = star;
  }

  onRate(star: number): void {
    this.rating = star;
    this.reviewForm.patchValue({ rating: star });
  }

  filledStars(): number[] {
    const count = Math.max(this.hovered, this.rating);
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) return;

    console.log(this.reviewForm.value);
  }
}
