import { Component, input, output } from '@angular/core';
import { Book } from '../../../models/books.interface';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../../../../core/components/pagination/pagination';

@Component({
  selector: 'books-table-component',
  imports: [RouterLink, Pagination],
  templateUrl: './table.html',
  styles: ``,
})
export class Table {
  books = input.required<Book[]>();
  page = input.required<number>();
  totalPages = input.required<number>();

  deleteBook = output<{ bookId: string; bookTitle: string }>();
  pageChange = output<number>();

  protected onDeleteBook(bookId: string, bookTitle: string): void {
    this.deleteBook.emit({ bookId, bookTitle });
  }

  protected onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
