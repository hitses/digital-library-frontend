import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../../books/models/book.interface';
import { IReview } from '../../review/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;
  private readonly bookUrl = this.baseUrl + '/book';
  private readonly reviewUrl = this.baseUrl + '/review';

  totalBooks: WritableSignal<number | null> = signal<number | null>(null);
  latestBooks: WritableSignal<IBook[] | null> = signal<any[] | null>(null);
  totalReviews: WritableSignal<number | null> = signal<number | null>(null);
  pendingReviews: WritableSignal<number | null> = signal<number | null>(null);
  latestReviews: WritableSignal<IReview[] | null> = signal<any[] | null>(null);

  getTotalBooks(): void {
    this.http.get<number>(`${this.bookUrl}/count`).subscribe({
      next: (total) => this.totalBooks.set(total),
      error: (err) => {
        console.error(err);
        this.totalBooks.set(null);
      },
    });
  }

  getLatestBooks(): void {
    this.http.get<IBook[]>(`${this.bookUrl}/latests?limit=3`).subscribe({
      next: (books) => this.latestBooks.set(books),
      error: (err) => {
        console.error(err);
        this.latestBooks.set(null);
      },
    });
  }

  getTotalReviews(): void {
    this.http.get<number>(`${this.reviewUrl}/count`).subscribe({
      next: (total) => this.totalReviews.set(total),
      error: (err) => {
        console.error(err);
        this.totalReviews.set(null);
      },
    });
  }

  getPendingReviews(): void {
    this.http.get<number>(`${this.reviewUrl}/pendings`).subscribe({
      next: (total) => this.pendingReviews.set(total),
      error: (err) => {
        console.error(err);
        this.pendingReviews.set(null);
      },
    });
  }

  getLatestReviews(): void {}
}
