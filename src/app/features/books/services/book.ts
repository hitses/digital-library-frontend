import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/book.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = environment.apiUrl + '/book';

  featuredBooks = signal<IBook[]>([]);
  newBooks = signal<IBook[]>([]);
  popularBooks = signal<IBook[]>([]);

  private http = inject(HttpClient);

  getFeaturedBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/featured`).subscribe({
      next: (books) => this.featuredBooks.set(books),
      error: (err) => {
        console.error(err);
        return this.featuredBooks.set([]);
      },
    });
  }

  getNewBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/new`).subscribe({
      next: (books) => this.newBooks.set(books),
      error: (err) => {
        console.error(err);
        return this.newBooks.set([]);
      },
    });
  }

  getPopularBooks(): void {
    this.http.get<IBook[]>(`${this.apiUrl}/popular`).subscribe({
      next: (books) => this.popularBooks.set(books),
      error: (err) => {
        console.error(err);
        return this.popularBooks.set([]);
      },
    });
  }
}
