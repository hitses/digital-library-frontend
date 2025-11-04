import { Component } from '@angular/core';
import { SearchBook } from '../search-book/search-book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'books-header-component',
  imports: [SearchBook, RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {}
