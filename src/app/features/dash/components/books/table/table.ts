import { Component, input, output } from '@angular/core';
import { Book } from '../../../models/books.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'books-table-component',
  imports: [RouterLink],
  templateUrl: './table.html',
  styles: ``,
})
export class Table {
  books = input.required<Book[]>();

  deleteBook = output<{ bookId: string; bookTitle: string }>();

  protected onDeleteBook(bookId: string, bookTitle: string): void {
    this.deleteBook.emit({ bookId, bookTitle });
  }
}
