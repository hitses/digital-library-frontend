import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book, BooksResponse } from '../models/books.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly booksUrl = environment.apiUrl + '/book';

  books = signal<Book[]>([]);
  totalBooks = signal<number | null>(null);
  totalPages = signal<number>(1);
  page = signal<number>(1);
  featuredBooks = signal<Book[]>([]);
  reviewlessBooks = signal<Book[]>([]);
  totalReviewlessBooks = signal<number | null>(null);
  recentBooks = signal<number | null>(null);

  private readonly http = inject(HttpClient);

  createBook(payload: any): Observable<Book> {
    return this.http.post<Book>(`${this.booksUrl}`, payload);
  }
  // createBook(book: any): void {
  //   this.http.post(`${this.booksUrl}`, book).subscribe({
  //     next: () => {
  //       this.getBooks();
  //     },
  //     error: (err) => {
  //       console.error('Error al crear libro:', err);
  //     },
  //   });
  // }

  getBooks(page: number = 1, limit: number = 25): void {
    const params = { page, limit };
    this.http.get<BooksResponse>(`${this.booksUrl}`, { params }).subscribe({
      next: (bookResponse) => {
        this.books.set(bookResponse.data);
        this.totalBooks.set(bookResponse.total);
        this.totalPages.set(bookResponse.totalPages);
        this.page.set(bookResponse.page);
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

  updateBook(id: string, book: any): void {
    this.http.put(`${this.booksUrl}/${id}`, book).subscribe({
      next: () => {
        this.getBooks();
      },
      error: (err) => {
        console.error('Error al actualizar libro:', err);
      },
    });
  }
}
