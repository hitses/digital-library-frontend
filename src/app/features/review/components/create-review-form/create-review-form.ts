import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilledStar } from '../../../../core/icons/filled-star/filled-star';
import { Star } from '../../../../core/icons/star/star';
import { EMAIL_PATTERN } from '../../../../core/patterns';
import { ReviewService } from '../../service/review';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'create-review-form-component',
  imports: [ReactiveFormsModule, FilledStar, Star],
  templateUrl: './create-review-form.html',
  styles: ``,
})
export class CreateReviewForm {
  bookId = input.required<string>();

  loading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly reviewService = inject(ReviewService);
  private readonly toastService = inject(ToastService);

  stars = [1, 2, 3, 4, 5];
  hovered = 0;
  rating = 0;

  reviewForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    review: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    rating: [0, [Validators.required, Validators.min(1)]],
  });

  getControl(path: string) {
    return this.reviewForm.get(path);
  }

  invalidAndTouched(path: string) {
    const control = this.getControl(path);
    return control?.invalid && (control.touched || control.dirty);
  }

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
      this.reviewForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    const { name, email, review, rating } = this.reviewForm.value;

    const bookId = this.bookId();

    this.reviewService.createReview(bookId, name!, email!, review!, rating!).subscribe({
      next: (res) => {
        this.toastService.success(
          'Reseña enviada correctamente',
          'Tu reseña será revisada por la administración y pronto será publicada. ¡Gracias por colaborar!',
        );

        this.reviewForm.reset();
        this.rating = 0;
        this.hovered = 0;
      },
      error: (err) => {
        if (err.status === 400)
          this.toastService.warning(
            'Datos inválidos',
            'Revisa el formulario y vuelve a intentarlo.',
          );
        else if (err.status === 429)
          this.toastService.error(
            'Demasiadas peticiones seguidas',
            'Inténtalo de nuevo más tarde.',
          );
        else
          this.toastService.error(
            'Error del servidor',
            'Error al enviar reseña. Inténtalo más tarde.',
          );

        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
