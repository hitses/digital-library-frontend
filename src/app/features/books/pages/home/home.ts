import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookList } from '../../components/book-list/book-list';
import { IBook } from '../../models/book.interface';
import { BookService } from '../../services/book';
import { BooksSection } from '../../components/books-section/books-section';

@Component({
  selector: 'app-home',
  imports: [BookList, BooksSection],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home implements OnInit {
  books: WritableSignal<IBook[]> = signal<IBook[]>([]);

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
