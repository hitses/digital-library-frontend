import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { BookForm } from '../../../components/books/book-form/book-form';
import { BooksService } from '../../../services/books';
import { Router } from '@angular/router';
import { Book } from '../../../models/books.interface';
import { INewBook } from '../../../../books/models/new-book.interface';
import { ToastService } from '../../../../../core/services/toast';
import { Spinner } from '../../../../../core/components/spinner/spinner';

@Component({
  selector: 'edit-book-page',
  imports: [BookForm, Spinner],
  templateUrl: './edit-book.html',
  styles: ``,
})
export default class EditBook implements OnInit {
  id = input.required<string>();

  private readonly booksService = inject(BooksService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  loading = signal(false);

  loadingBook = computed<boolean>(() => this.booksService.loading());
  book = computed<Book | null>(() => this.booksService.book());

  ngOnInit() {
    this.booksService.getBookById(this.id());
  }

  handleEdit(payload: INewBook) {
    const currentBook = this.book();
    if (!currentBook) return;

    this.loading.set(true);

    this.booksService.updateBook(currentBook._id, payload).subscribe({
      next: () => {
        this.loading.set(false);

        this.toastService.success(
          'Libro actualizado correctamente',
          `El libro ${payload.title.toUpperCase()} se ha actualizado correctamente.`,
        );

        this.router.navigate(['/dash/books']);
      },
      error: (error) => {
        this.loading.set(false);

        if (error.status === 409)
          this.toastService.error(
            'ISBN duplicado',
            `El libro con ISBN ${payload.isbn} ya existe en la base de datos.`,
            5000,
          );
        else
          this.toastService.error(
            'Error al actualizar el libro',
            'Revisa los datos e inténtalo de nuevo.',
          );
      },
    });
  }
}
