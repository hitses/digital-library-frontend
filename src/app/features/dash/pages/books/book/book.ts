import { Component, computed, effect, inject, input, OnDestroy } from '@angular/core';
import { BooksService } from '../../../services/books';
import { Router, RouterLink } from '@angular/router';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { DatePipe, Location } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';

@Component({
  selector: 'book-page',
  imports: [RouterLink, Spinner, DatePipe],
  templateUrl: './book.html',
  styles: ``,
})
export default class Book implements OnDestroy {
  id = input.required<string>();

  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly booksService = inject(BooksService);
  private readonly toastService = inject(ToastService);
  private readonly confirmDialog = inject(ConfirmDialogService);

  book = computed(() => this.booksService.book());

  constructor() {
    effect(() => {
      const bookId = this.id();
      if (!bookId) return;

      this.booksService.getBookById(bookId);
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
