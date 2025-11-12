import { Component, computed, inject, signal } from '@angular/core';
import { ResumeCard } from '../../components/home/resume-card/resume-card';
import { BooksService } from '../../services/books';

@Component({
  selector: 'app-books',
  imports: [ResumeCard],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {
  books = computed(() => this.booksService.books());
  totalBooksCount = computed(() => this.booksService.totalBooks());
  featuredBooksCount = computed(() => this.booksService.featuredBooks().length);
  reviewlessBooksCount = computed(() => this.booksService.reviewlessBooks().length);
  totalReviewlessBooksCount = computed(() => this.booksService.totalReviewlessBooks());
  recentBooks = computed(() => this.booksService.recentBooks());

  private readonly booksService = inject(BooksService);

  constructor() {
    this.booksService.getTotalBooks();
    this.booksService.getFeaturedBooks();
    this.booksService.getReviewlessBooks();
    this.booksService.getRecentBooks();
  }

  stats = {
    totalBooks: 128,
    featuredBooks: 9,
    avgRating: 4.2,
  };

  editBook(bookId: string) {}
}
