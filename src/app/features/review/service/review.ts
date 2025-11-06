import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IReview, IReviews } from '../models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  reviews = signal<IReviews | null>(null);

  createReview(bookId: string, name: string, email: string, review: string, rating: number) {
    return this.http.post<IReview>(`${this.baseUrl}/review`, {
      bookId,
      name,
      email,
      review,
      rating,
    });
  }

  getReviewsByBook(bookId: string, page = 1): void {
    this.http.get<IReviews>(`${this.baseUrl}/book/${bookId}?page=${page}`).subscribe({
      next: (reviews) => this.reviews.set(reviews),
      error: (err) => {
        console.error(err);
        return this.reviews.set(null);
      },
    });
  }

  clearReviews() {
    this.reviews.set(null);
  }
}
