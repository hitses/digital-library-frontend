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

  onCheckReview(id: string) {
    this.reviewsService.verifyReview(id).subscribe({
      next: () => {
        this.toastService.success('Reseña verificada', 'La reseña ha sido publicada correctamente');

        this.fetchPendingReviews(this.id());
        this.fetchPublishedReviews(this.id());
      },
      error: (err) => {
        console.error('Error verifying review:', err);
        this.toastService.error('Error', 'No se pudo verificar la reseña');
      },
    });
  }

  onSaveReview(event: { id: string; data: Partial<IReview> }): void {
    // Se envían los nuevos datos al servidor: el identificador es obligatorio
    this.reviewsService.updateReview(event.id, event.data).subscribe({
      next: () => {
        // Se notifica el éxito de la operación: se muestra un mensaje de confirmación
        this.toastService.success(
          'Reseña actualizada',
          'Los cambios se han guardado correctamente',
        );
        // Se realiza la renovación de ambas listas: se obtienen los datos actualizados del libro
        this.fetchPendingReviews(this.id());
        this.fetchPublishedReviews(this.id());
      },
      error: (err) => {
        // Se gestiona el error en la actualización: se registra el fallo en la consola
        console.error('Error updating review:', err);
        this.toastService.error('Error', 'No se pudieron guardar los cambios');
      },
    });
  }

  async onDeleteReview(review: { id: string; name: string }): Promise<void> {
    // Se solicita confirmación al usuario: se muestra un diálogo de advertencia
    const confirmed = await this.confirmDialog.confirmDelete(
      `la reseña de ${review.name.toLocaleUpperCase()}`,
    );

    if (!confirmed) return;

    // Se procede con la eliminación: se invoca al servicio de gestión de reseñas
    this.reviewsService.deleteReview(review.id).subscribe({
      next: () => {
        // Se notifica el éxito de la operación: se informa al administrador
        this.toastService.success('Reseña eliminada', 'La reseña ha sido eliminada correctamente');

        // Se realiza la renovación de las listas: se obtienen de nuevo los datos del libro
        this.fetchPendingReviews(this.id());
        this.fetchPublishedReviews(this.id());
      },
      error: (err) => {
        // Se gestiona el error en la eliminación: se registra el fallo en la consola
        console.error('Error deleting review:', err);
        this.toastService.error('Error', 'No se pudo eliminar la reseña');
      },
    });
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
