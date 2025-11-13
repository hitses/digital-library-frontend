import { Component, computed, inject, signal } from '@angular/core';
import { ResumeCard } from '../../components/home/resume-card/resume-card';
import { BooksService } from '../../services/books';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [ResumeCard, Pagination, RouterLink],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {
  books = computed(() => this.booksService.books());
  page = computed(() => this.booksService.page());
  totalPages = computed(() => this.booksService.totalPages());
  totalBooksCount = computed(() => this.booksService.totalBooks());
  featuredBooksCount = computed(() => this.booksService.featuredBooks().length);
  reviewlessBooksCount = computed(() => this.booksService.reviewlessBooks().length);
  totalReviewlessBooksCount = computed(() => this.booksService.totalReviewlessBooks());
  recentBooks = computed(() => this.booksService.recentBooks());

  private readonly booksService = inject(BooksService);

  constructor() {
    this.booksService.getBooks(this.page(), 25);
    this.booksService.getFeaturedBooks();
    this.booksService.getReviewlessBooks();
    this.booksService.getRecentBooks();
  }

  onPageChange(p: number): void {
    this.booksService.getBooks(p, 25);
  }

  deleteBook(bookId: string) {}
}
