import { Component, computed, effect, inject, input, OnDestroy } from '@angular/core';
import { BooksService } from '../../../services/books';
import { RouterLink } from '@angular/router';
import { Spinner } from '../../../../../core/components/spinner/spinner';

@Component({
  selector: 'book-page',
  imports: [RouterLink, Spinner],
  templateUrl: './book.html',
  styles: ``,
})
export default class Book implements OnDestroy {
  id = input.required<string>();

  private readonly booksService = inject(BooksService);

  book = computed(() => this.booksService.book());

  constructor() {
    effect(() => {
      const bookId = this.id();
      if (!bookId) return;

      this.booksService.getBookById(bookId);
    });
  }

  ngOnDestroy(): void {
    this.booksService.clearBook();
  }
}
