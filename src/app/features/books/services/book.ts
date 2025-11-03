import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'http://localhost:3000/api/book';

  featuredBooks = signal<IBook[]>([]);
  newBooks = signal<IBook[]>([]);
  popularBooks = signal<IBook[]>([]);

  private http = inject(HttpClient);

  getFeaturedBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/featured`).subscribe({
      next: (books) => this.featuredBooks.set(books),
      error: (err) => this.featuredBooks.set([]),
    });
  }

  getNewBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/new`).subscribe({
      next: (books) => this.newBooks.set(books),
      error: (err) => this.newBooks.set([]),
    });
  }

  getPopularBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/popular`).subscribe({
      next: (books) => this.popularBooks.set(books),
      error: (err) => this.popularBooks.set([]),
    });
  }
}
