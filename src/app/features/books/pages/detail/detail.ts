import { Component, computed, effect, inject, input, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book';
import { StarsReview } from '../../components/stars-review/stars-review';
import { Review } from '../../../review/components/review/review';
import { ReviewService } from '../../../review/service/review';
import { Pagination } from '../../../../core/components/pagination/pagination';

@Component({
  selector: 'detail-page',
  imports: [StarsReview, Review, Pagination],
  templateUrl: './detail.html',
  styles: ``,
})
export default class Detail implements OnDestroy {
  id = input.required<string>();

  private readonly bookService = inject(BookService);
  private readonly reviewService = inject(ReviewService);

  book = this.bookService.book;
  reviews = this.reviewService.reviews;

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
      if (!bookId) return;

      this.bookService.getBookById(bookId);
      this.getReviewsByBook(bookId, 1);
    });
  }

  getReviewsByBook(bookId: string, page: number) {
    this.reviewService.getReviewsByBook(bookId, page);
  }

  changePage(page: number) {
    const bookId = this.id();
    if (!bookId) return;

    this.getReviewsByBook(bookId, page);
  }

  ngOnDestroy(): void {
    this.bookService.clearBook();
    this.reviewService.clearReviews();
  }
}
