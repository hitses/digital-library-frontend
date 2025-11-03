import { Component } from '@angular/core';
import { SearchBook } from '../search-book/search-book';

@Component({
  selector: 'books-header-component',
  imports: [SearchBook],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {}
