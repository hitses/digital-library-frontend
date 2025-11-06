import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';
import { BookList } from '../../components/book-list/book-list';
import { Pagination } from '../../../../core/components/pagination/pagination';

@Component({
  selector: 'search-page',
  imports: [BookList, Pagination],
  templateUrl: './search.html',
  styles: ``,
})
export default class Search implements OnDestroy {
  q = input<string>('');

  protected readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  searchResults = this.bookService.searchResults;
  currentPage = 1;

  constructor() {
    effect(() => {
      const query = this.q();

      this.bookService.clearBook();
      this.currentPage = 1;
      this.bookService.searchBooks(query, this.currentPage);
    });

    effect(() => {
      const results = this.searchResults();
      const query = this.q();

      if (results && results.total === 1 && query !== '') {
        const id = results.data[0]._id;
        this.router.navigate(['/', id]);
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    const query = this.q();

    this.bookService.searchBooks(query, page);
  }

  ngOnDestroy(): void {
    this.bookService.clearSearchResults();
  }
}
