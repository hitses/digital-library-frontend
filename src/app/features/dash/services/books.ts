import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book, BooksResponse } from '../models/books.interface';
import { Observable } from 'rxjs';
import { INewBook } from '../../books/models/new-book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly booksUrl = environment.apiUrl + '/book';

  books = signal<Book[]>([]);
  book = signal<Book | null>(null);
  totalBooks = signal<number | null>(null);
  searchedTotalBooks = signal<number | null>(null);
  totalPages = signal<number>(1);
  page = signal<number>(1);
  featuredBooks = signal<Book[]>([]);
  reviewlessBooks = signal<Book[]>([]);
  totalReviewlessBooks = signal<number | null>(null);
  recentBooks = signal<number | null>(null);
  loading = signal(true);

  private readonly http = inject(HttpClient);

  createBook(payload: INewBook): Observable<INewBook> {
    return this.http.post<INewBook>(`${this.booksUrl}`, payload);
  }

  getBooks(page: number = 1, limit: number = 25, q: string = ''): void {
    const params = { page, limit, q };

    this.http.get<BooksResponse>(`${this.booksUrl}/search`, { params }).subscribe({
      next: (bookResponse) => {
        this.books.set(bookResponse.data);
        this.searchedTotalBooks.set(bookResponse.total);
        this.totalPages.set(bookResponse.totalPages);
        this.page.set(bookResponse.page);
      },
      error: (err) => {
        console.error(err);
        this.books.set([]);
      },
    });
  }

  getTotalBooks(): void {
    this.http.get<number>(`${this.booksUrl}/count`).subscribe({
      next: (total) => this.totalBooks.set(total),
      error: (err) => {
        console.error(err);
        this.totalBooks.set(null);
      },
    });
  }

  getBookById(id: string): void {
    this.loading.set(true);

    this.http.get<Book>(`${this.booksUrl}/${id}`).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.book.set(null);
        this.loading.set(false);
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

  updateBook(id: string, book: INewBook): Observable<INewBook> {
    return this.http.patch<INewBook>(`${this.booksUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.booksUrl}/${id}`);
  }

  clearBook(): void {
    this.book.set(null);
  }
}
