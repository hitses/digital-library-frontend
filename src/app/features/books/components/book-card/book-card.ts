import { Component, input } from '@angular/core';
import { IBook } from '../../models/book.interface';

@Component({
  selector: 'book-card-component',
  imports: [],
  templateUrl: './book-card.html',
  styles: ``,
})
export class BookCard {
  book = input.required<IBook>();
}
