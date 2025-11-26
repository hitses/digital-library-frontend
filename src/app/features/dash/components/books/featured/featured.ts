import { Component, computed, inject } from '@angular/core';
import { BooksService } from '../../../services/books';
import { Table } from '../table/table';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'featured-component',
  imports: [Table],
  templateUrl: './featured.html',
  styles: ``,
})
export default class Featured {
  private readonly booksService = inject(BooksService);
  private readonly confirmDialog = inject(ConfirmDialogService);
  private readonly toastService = inject(ToastService);

  books = computed(() => this.booksService.featuredBooks());
  page = computed(() => 1);
  totalPages = computed(() => 1);

  constructor() {
    this.booksService.getFeaturedBooks();
  }

  onPageChange(p: number): void {
    // No pagination for featured for now, or handled differently
  }

  async onDeleteBook(event: { bookId: string; bookTitle: string }): Promise<void> {
    const { bookId, bookTitle } = event;

    const confirmed = await this.confirmDialog.confirmDelete(bookTitle.toUpperCase());

    if (!confirmed) return;
    else {
      this.booksService.deleteBook(bookId).subscribe({
        next: (book) => {
          this.toastService.success(
            'Libro eliminado correctamente',
            `El libro ${book.title.toUpperCase()} se ha eliminado correctamente`,
          );

          this.booksService.getFeaturedBooks();
          this.booksService.getRecentBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }

  onToggleFeatured(event: { bookId: string; featured: boolean }): void {
    const { bookId, featured } = event;

    this.booksService.toggleFeatured(bookId, featured).subscribe({
      next: (book) => {
        this.toastService.success(
          'Libro actualizado correctamente',
          `El libro ${book.title.toUpperCase()} ha sido actualizado correctamente`,
        );

        this.booksService.getFeaturedBooks();
      },
      error: (err) => {
        console.error('Error updating book:', err);
      },
    });
  }
}
