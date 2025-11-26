import { Component, computed, inject } from '@angular/core';
import { ResumeCard } from '../../components/home/resume-card/resume-card';
import { BooksService } from '../../services/books';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [ResumeCard, RouterLink, RouterOutlet],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {
  private readonly booksService = inject(BooksService);

  totalBooksCount = computed(() => this.booksService.totalBooks());
  featuredBooksCount = computed(() => this.booksService.featuredBooks().length);
  totalReviewlessBooksCount = computed(() => this.booksService.totalReviewlessBooks());
  recentBooks = computed(() => this.booksService.recentBooks());

  constructor() {
    this.booksService.getTotalBooks();
    this.booksService.getFeaturedBooks();
    this.booksService.getReviewlessBooks();
    this.booksService.getRecentBooks();
  }
}
