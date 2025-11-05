import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { BookList } from '../../components/book-list/book-list';
import { Pagination } from '../../../../core/components/pagination/pagination';

@Component({
  selector: 'search-page',
  imports: [RouterLink, BookList, Pagination],
  templateUrl: './search.html',
  styles: ``,
})
export default class Search implements OnDestroy {
  q = input<string>('');

  protected readonly bookService = inject(BookService);

  searchResults = this.bookService.searchResults;
  currentPage = 1;

  constructor() {
    effect(() => {
      const query = this.q();

      if (query || query === '') this.bookService.searchBooks(query, this.currentPage);
    });
  }

  getPagesArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;

    const query = this.q();

    if (query || query === '') this.bookService.searchBooks(query, page);
  }

  ngOnDestroy(): void {
    this.bookService.clearSearchResults();
  }

  getMiddlePages(): number[] {
    const current = this.searchResults()!.page;
    const total = this.searchResults()!.totalPages;

    const pages = [];

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let p = start; p <= end; p++) pages.push(p);

    return pages;
  }
}
