import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IReviews } from '../../review/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class DashReviewsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getReviewsByBook(
    bookId: string,
    verified: boolean,
    page: number = 1,
    limit: number = 5,
  ): Observable<IReviews> {
    return this.http.get<IReviews>(
      `${this.baseUrl}/review/book/${bookId}?page=${page}&limit=${limit}&verified=${verified}`,
    );
  }

  verifyReview(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/review/${id}`, {
      verified: true,
    });
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/review/${id}`);
  }
}
