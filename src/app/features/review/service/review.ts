import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IReviews } from '../models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/review';

  reviews = signal<IReviews | null>(null);

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
