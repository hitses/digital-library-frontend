import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookList } from '../../components/book-list/book-list';
import { IBook } from '../../models/book.interface';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-home',
  imports: [BookList],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home implements OnInit {
  books: WritableSignal<IBook[]> = signal<IBook[]>([]);

  protected readonly bookService = inject(BookService);

  featuredBooks = this.bookService.featuredBooks;
  newBooks = this.bookService.newBooks;
  popularBooks = this.bookService.popularBooks;

  ngOnInit(): void {
    this.bookService.getFeaturedBooks();
    this.bookService.getNewBooks();
    this.bookService.getPopularBooks();
  }
}
