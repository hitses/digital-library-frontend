import { Component, input } from '@angular/core';
import { IBook } from '../../models/book.interface';
import { BookList } from '../book-list/book-list';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'books-section-component',
  imports: [BookList, TitleCasePipe],
  templateUrl: './books-section.html',
  styles: ``,
})
export class BooksSection {
  title = input.required<string>();
  books = input.required<IBook[]>();
  bookType = input.required<string>();
}
