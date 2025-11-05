import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBook } from '../models/book.interface';
import { environment } from '../../../../environments/environment';
import { ISearchResponse } from '../models/search.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = environment.apiUrl + '/book';

  featuredBooks = signal<IBook[]>([]);
  newBooks = signal<IBook[]>([]);
  popularBooks = signal<IBook[]>([]);
  book = signal<IBook | null>(null);
  searchResults = signal<ISearchResponse<IBook> | null>(null);
  isSearching = signal<boolean>(false);

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

  getBookById(id: string): void {
    this.http.get<IBook>(`${this.apiUrl}/${id}`).subscribe({
      next: (book) => this.book.set(book),
      error: (err) => {
        console.error(err);
        return this.book.set(null);
      },
    });
  }

  searchBooks(query: string, page = 1, limit = 12): void {
    this.isSearching.set(true);

    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    this.http.get<ISearchResponse<IBook>>(`${this.apiUrl}/search`, { params }).subscribe({
      next: (response) => {
        this.searchResults.set(response);
        this.isSearching.set(false);
      },
      error: (error) => {
        console.error(error);
        this.isSearching.set(false);
      },
    });
  }

  clearSearchResults(): void {
    this.searchResults.set(null);
  }

  clearBook(): void {
    this.book.set(null);
  }
}
