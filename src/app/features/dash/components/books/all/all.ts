import { Component, computed, effect, inject, signal } from '@angular/core';
import { BooksService } from '../../../services/books';
import { Table } from '../table/table';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'all-books-component',
  imports: [Table, Spinner],
  templateUrl: './all.html',
  styles: ``,
})
export default class All {
  private readonly booksService = inject(BooksService);
  private readonly route = inject(ActivatedRoute);
  private readonly confirmDialog = inject(ConfirmDialogService);
  private readonly toastService = inject(ToastService);

  qParam = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  query = computed(() => (this.qParam().get('q') || '').trim());

  books = computed(() => this.booksService.books());
  searchedTotalBooks = computed(() => this.booksService.searchedTotalBooks());
  page = computed(() => this.booksService.page());
  totalPages = computed(() => this.booksService.totalPages());

  constructor() {
    effect(() => {
      const q = this.query();
      const p = this.page();

      this.booksService.getBooks(p, 25, q);
    });
  }

  onPageChange(p: number): void {
    this.booksService.getBooks(p, 25, this.query());
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

          this.booksService.getBooks(this.page(), 25, this.query());
          this.booksService.getRecentBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }
}
