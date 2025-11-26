import { Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { BooksService } from '../../../services/books';
import { DashReviewsService } from '../../../services/reviews';
import { Router, RouterLink } from '@angular/router';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { DatePipe, Location } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';
import { ReviewList } from '../../../components/reviews/review-list/review-list';
import { IReview } from '../../../../review/models/review.interface';

@Component({
  selector: 'book-page',
  imports: [RouterLink, Spinner, DatePipe, ReviewList],
  templateUrl: './book.html',
  styles: ``,
})
export default class Book implements OnDestroy {
  id = input.required<string>();

  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly booksService = inject(BooksService);
  private readonly reviewsService = inject(DashReviewsService);
  private readonly toastService = inject(ToastService);
  private readonly confirmDialog = inject(ConfirmDialogService);

  book = computed(() => this.booksService.book());

  pendingReviews = signal<IReview[]>([]);
  pendingTotal = signal<number>(0);
  pendingLoading = signal<boolean>(false);
  pendingPage = signal<number>(1);
  pendingTotalPages = signal<number>(1);

  publishedReviews = signal<IReview[]>([]);
  publishedTotal = signal<number>(0);
  publishedLoading = signal<boolean>(false);
  publishedPage = signal<number>(1);
  publishedTotalPages = signal<number>(1);

  constructor() {
    effect(() => {
      const bookId = this.id();
      if (!bookId) return;

      this.booksService.getBookById(bookId);
      this.fetchPendingReviews(bookId);
      this.fetchPublishedReviews(bookId);
    });
  }

  fetchPendingReviews(bookId: string) {
    this.pendingLoading.set(true);
    this.reviewsService.getReviewsByBook(bookId, false, this.pendingPage()).subscribe({
      next: (res) => {
        this.pendingReviews.set(res.data);
        this.pendingTotal.set(res.total);
        this.pendingTotalPages.set(res.totalPages);
        this.pendingLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching pending reviews:', err);
        this.pendingLoading.set(false);
      },
    });
  }

  fetchPublishedReviews(bookId: string) {
    this.publishedLoading.set(true);
    this.reviewsService.getReviewsByBook(bookId, true, this.publishedPage()).subscribe({
      next: (res) => {
        this.publishedReviews.set(res.data);
        this.publishedTotal.set(res.total);
        this.publishedTotalPages.set(res.totalPages);
        this.publishedLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching published reviews:', err);
        this.publishedLoading.set(false);
      },
    });
  }

  onPendingPageChange(page: number) {
    this.pendingPage.set(page);
    this.fetchPendingReviews(this.id());
  }

  onPublishedPageChange(page: number) {
    this.publishedPage.set(page);
    this.fetchPublishedReviews(this.id());
  }

  goBack() {
    this.location.back();
  }

  async onDeleteBook(): Promise<void> {
    const confirmed = await this.confirmDialog.confirmDelete(this.book()!.title.toUpperCase());

    if (!confirmed) return;
    else {
      this.booksService.deleteBook(this.book()!._id).subscribe({
        next: (book) => {
          this.toastService.success(
            'Libro eliminado correctamente',
            `El libro ${book.title.toUpperCase()} se ha eliminado correctamente`,
          );

          this.router.navigate(['/dash/books']);
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }

  onToggleFeatured(featured: boolean): void {
    const book = this.book();
    if (!book) return;

    this.booksService.toggleFeatured(book._id, featured).subscribe({
      next: (updatedBook) => {
        this.toastService.success(
          'Libro actualizado correctamente',
          `El libro ${updatedBook.title.toUpperCase()} ha sido actualizado correctamente`,
        );

        this.booksService.getBookById(updatedBook._id);
      },
      error: (err) => {
        console.error('Error updating book:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.booksService.clearBook();
  }
}
