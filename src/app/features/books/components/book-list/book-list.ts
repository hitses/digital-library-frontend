import { Component, input } from '@angular/core';
import { IBook } from '../../models/book.interface';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'book-list-component',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styles: ``,
})
export class BookList {
  books = input.required<IBook[]>();
}
