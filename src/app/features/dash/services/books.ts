import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book, BooksResponse } from '../models/books.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly booksUrl = environment.apiUrl + '/book';

  books = signal<Book[]>([]);
  totalBooks = signal<number | null>(null);
  featuredBooks = signal<Book[]>([]);
  reviewlessBooks = signal<Book[]>([]);
  totalReviewlessBooks = signal<number | null>(null);
  recentBooks = signal<number | null>(null);

  private readonly http = inject(HttpClient);

  getTotalBooks(): void {
    this.http.get<BooksResponse>(`${this.booksUrl}`).subscribe({
      next: (bookResponse) => {
        this.books.set(bookResponse.data);
        this.totalBooks.set(bookResponse.total);
      },
      error: (err) => {
        console.error(err);
        this.books.set([]);
      },
    });
  }

  getFeaturedBooks(): void {
    this.http.get<Book[]>(`${this.booksUrl}/featured`).subscribe({
      next: (books) => this.featuredBooks.set(books),
      error: (err) => {
        console.error(err);
        this.featuredBooks.set([]);
      },
    });
  }

  getReviewlessBooks(): void {
    this.http.get<BooksResponse>(`${this.booksUrl}/reviewless`).subscribe({
      next: (bookResponse) => {
        this.reviewlessBooks.set(bookResponse.data);
        this.totalReviewlessBooks.set(bookResponse.total);
      },
      error: (err) => {
        console.error(err);
        this.reviewlessBooks.set([]);
      },
    });
  }

  getRecentBooks(): void {
    this.http.get<number>(`${this.booksUrl}/recents?days=30`).subscribe({
      next: (books) => this.recentBooks.set(books),
      error: (err) => {
        console.error(err);
        this.recentBooks.set(null);
      },
    });
  }
}
