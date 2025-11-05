import { Component, computed, effect, inject, input, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book';
import { StarsReview } from '../../components/stars-review/stars-review';
import { Review } from '../../components/review/review';

@Component({
  selector: 'detail-page',
  imports: [StarsReview, Review],
  templateUrl: './detail.html',
  styles: ``,
})
export default class Detail implements OnDestroy {
  id = input.required<string>();

  private readonly bookService = inject(BookService);

  book = this.bookService.book;

  filledStars = computed(() => {
    const currentBook = this.book();
    if (!currentBook) return [];

    const rating = Math.round(currentBook.averageRating || 0);

    return Array(rating).fill(0);
  });

  stars = computed(() => {
    const currentBook = this.book();
    if (!currentBook) return [];

    const rating = Math.round(currentBook.averageRating || 0);

    return Array(5 - rating).fill(0);
  });

  constructor() {
    effect(() => {
      const bookId = this.id();
      this.bookService.getBookById(bookId);
    });
  }

  ngOnDestroy(): void {
    this.bookService.clearBook();
  }
}
