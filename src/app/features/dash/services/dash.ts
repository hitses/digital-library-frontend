import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl;
  private readonly bookUrl = this.baseUrl + '/book';
  private readonly reviewUrl = this.baseUrl + '/review';

  totalBooks: WritableSignal<number | null> = signal<number | null>(null);
  totalReviews: WritableSignal<number | null> = signal<number | null>(null);
  pendingReviews: WritableSignal<number | null> = signal<number | null>(null);

  getTotalBooks(): void {
    this.http.get<number>(`${this.bookUrl}/count`).subscribe({
      next: (total) => this.totalBooks.set(total),
      error: (err) => {
        console.error(err);
        this.totalBooks.set(null);
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
}
