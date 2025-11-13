import { Component } from '@angular/core';
import { BookForm } from '../../../components/books/book-form/book-form';

@Component({
  selector: 'edit-book-page',
  imports: [BookForm],
  templateUrl: './edit-book.html',
  styles: ``,
})
export default class EditBook {}
