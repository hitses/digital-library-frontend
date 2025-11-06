import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/review';

  reviews = signal<any>(null);

  getReviewsByBook(bookId: string, page = 1) {
    this.http
      .get(`${this.baseUrl}/book/${bookId}?page=${page}`)
      .subscribe((res) => this.reviews.set(res));
  }

  clearReviews() {
    this.reviews.set(null);
  }
}
