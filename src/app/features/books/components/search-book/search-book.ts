import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-book-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-book.html',
  styles: ``,
})
export class SearchBook {
  private readonly router = inject(Router);

  searchControl = new FormControl<string>('', { nonNullable: true });

  onSearch(event: Event): void {
    event.preventDefault();

    const query = this.searchControl.value.trim();

    if (query || query === '')
      this.router.navigate(['/search'], {
        queryParams: { q: query || '' },
      });

    this.searchControl.reset();
  }
}
