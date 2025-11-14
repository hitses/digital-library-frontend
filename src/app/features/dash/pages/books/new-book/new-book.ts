import { Component, inject, signal, ViewChild } from '@angular/core';
import { BookForm } from '../../../components/books/book-form/book-form';
import { BooksService } from '../../../services/books';
import { Router } from '@angular/router';
import { INewBook } from '../../../../books/models/new-book.interface';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'new-book-page',
  imports: [BookForm],
  templateUrl: './new-book.html',
  styles: ``,
})
export default class NewBook {
  @ViewChild('form') form!: BookForm;

  readonly router = inject(Router);
  private readonly booksService = inject(BooksService);
  private readonly toastService = inject(ToastService);

  loading = signal(false);
  error = signal('');

  handleCreate(payload: INewBook) {
    this.loading.set(true);
    this.error.set('');

    this.booksService.createBook(payload).subscribe({
      next: () => {
        this.toastService.success(
          'Libro creado correctamente',
          `El libro ${payload.title.toUpperCase()} se ha creado correctamente.`,
        );

        this.form.onReset();
      },
      error: (error) => {
        if (error.status === 400)
          this.toastService.error(
            'Error al crear el libro',
            'Revisa los datos e inténtalo de nuevo.',
          );

        if (error.status === 409)
          this.toastService.error(
            'ISBN duplicado',
            `El libro con ISBN ${payload.isbn} ya ha sido añadido.`,
            5000,
          );
      },
      complete: () => this.loading.set(false),
    });
  }
}
