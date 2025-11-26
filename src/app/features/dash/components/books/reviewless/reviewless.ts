import { Component, computed, effect, inject } from '@angular/core';
import { BooksService } from '../../../services/books';
import { Table } from '../table/table';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'reviewless-component',
  imports: [Table],
  templateUrl: './reviewless.html',
  styles: ``,
})
export default class Reviewless {
  private readonly booksService = inject(BooksService);
  private readonly confirmDialog = inject(ConfirmDialogService);
  private readonly toastService = inject(ToastService);

  books = computed(() => this.booksService.reviewlessBooks());
  page = computed(() => this.booksService.page());
  totalPages = computed(() => this.booksService.totalPages());
  totalBooks = computed(() => this.booksService.totalReviewlessBooks());

  constructor() {
    this.booksService.getReviewlessBooks(1, 25, true);
  }

  onPageChange(p: number): void {
    this.booksService.getReviewlessBooks(p, 25, true);
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

          this.booksService.getReviewlessBooks(this.page(), 25, true);
          this.booksService.getRecentBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }
}
