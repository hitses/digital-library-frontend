import { Component, input } from '@angular/core';
import { IBook } from '../../models/book.interface';
import { BookList } from '../book-list/book-list';

@Component({
  selector: 'books-section-component',
  imports: [BookList],
  templateUrl: './books-section.html',
  styles: ``,
})
export class BooksSection {
  title = input.required<string>();
  books = input.required<IBook[]>();
  bookType = input.required<string>();
}
