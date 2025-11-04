import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IBook } from '../../models/book.interface';
import { BookService } from '../../services/book';
import { BooksSection } from '../../components/books-section/books-section';

@Component({
  selector: 'home-page',
  imports: [BooksSection],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home implements OnInit {
  protected readonly bookService = inject(BookService);

  featuredBooks: WritableSignal<IBook[]> = this.bookService.featuredBooks;
  newBooks: WritableSignal<IBook[]> = this.bookService.newBooks;
  popularBooks: WritableSignal<IBook[]> = this.bookService.popularBooks;

  ngOnInit(): void {
    this.bookService.getFeaturedBooks();
    this.bookService.getNewBooks();
    this.bookService.getPopularBooks();
  }
}
