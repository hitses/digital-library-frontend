import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilledStar } from '../../../../core/icons/filled-star/filled-star';
import { Star } from '../../../../core/icons/star/star';
import { EMAIL_PATTERN } from '../../../../core/patterns';
import { ReviewService } from '../../service/review';

@Component({
  selector: 'create-review-form-component',
  imports: [ReactiveFormsModule, FilledStar, Star],
  templateUrl: './create-review-form.html',
  styles: ``,
})
export class CreateReviewForm {
  bookId = input.required<string>();

  private readonly fb = inject(FormBuilder);
  private readonly reviewService = inject(ReviewService);

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
    if (this.reviewForm.invalid) {
      console.error('Formulario inválido:', this.reviewForm.errors, this.reviewForm.value);

      return;
    }

    const { name, email, review, rating } = this.reviewForm.value;

    const bookId = this.bookId();

    console.log({
      review: {
        name,
        email,
        review,
        rating,
      },
      bookId,
    });

    this.reviewService.createReview(bookId, name!, email!, review!, rating!).subscribe({
      next: (res) => {
        console.log('✅ Review creada:', res);

        this.reviewForm.reset();
      },
      error: (err) => {
        if (err.status === 400) console.error('❌ Error: datos inválidos');
        else if (err.status === 429)
          console.error('❌ Demsaiadas peticiones seguidas. Inténtalo de nuevo en unos minutos.');
        else console.error('❌ Error al enviar reseña:', err);
      },
    });
  }
}
