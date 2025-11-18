import { Component, computed, inject } from '@angular/core';
import { ResumeCard } from '../../components/home/resume-card/resume-card';
import { BooksService } from '../../services/books';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { RouterLink } from '@angular/router';
import { Spinner } from '../../../../core/components/spinner/spinner';
import { ToastService } from '../../../../core/services/toast';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog';

@Component({
  selector: 'app-books',
  imports: [ResumeCard, Pagination, RouterLink, Spinner],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {
  books = computed(() => this.booksService.books());
  page = computed(() => this.booksService.page());
  totalPages = computed(() => this.booksService.totalPages());
  totalBooksCount = computed(() => this.booksService.totalBooks());
  featuredBooksCount = computed(() => this.booksService.featuredBooks().length);
  reviewlessBooksCount = computed(() => this.booksService.reviewlessBooks().length);
  totalReviewlessBooksCount = computed(() => this.booksService.totalReviewlessBooks());
  recentBooks = computed(() => this.booksService.recentBooks());

  private readonly booksService = inject(BooksService);
  private readonly toastService = inject(ToastService);
  private confirmDialog = inject(ConfirmDialogService);

  constructor() {
    this.booksService.getBooks(this.page(), 25);
    this.booksService.getFeaturedBooks();
    this.booksService.getReviewlessBooks();
    this.booksService.getRecentBooks();
  }

  onPageChange(p: number): void {
    this.booksService.getBooks(p, 25);
  }

  async onDeleteBook(bookId: string, bookTitle: string): Promise<void> {
    const confirmed = await this.confirmDialog.confirmDelete(bookTitle.toUpperCase());

    if (!confirmed) return;
    else {
      this.booksService.deleteBook(bookId).subscribe({
        next: (book) => {
          this.toastService.success(
            'Libro eliminado correctamente',
            `El libro ${book.title.toUpperCase()} se ha eliminado correctamente`,
          );

          this.booksService.getBooks(this.page(), 25);
          this.booksService.getRecentBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }
}
