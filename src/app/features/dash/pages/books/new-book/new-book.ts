import { Component, inject, signal } from '@angular/core';
import { BookForm } from '../../../components/books/book-form/book-form';
import { BooksService } from '../../../services/books';
import { Router } from '@angular/router';
import { INewBook } from '../../../../books/models/new-book.interface';

@Component({
  selector: 'new-book-page',
  imports: [BookForm],
  templateUrl: './new-book.html',
  styles: ``,
})
export default class NewBook {
  private readonly booksService = inject(BooksService);
  readonly router = inject(Router);

  loading = signal(false);
  error = signal('');

  handleCreate(payload: INewBook) {
    this.loading.set(true);
    this.error.set('');

    this.booksService.createBook(payload).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.loading.set(false);
        this.error.set('Error al crear el libro');
      },
    });
  }
}
