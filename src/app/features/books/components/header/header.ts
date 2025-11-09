import { Component, signal } from '@angular/core';
import { SearchBook } from '../search-book/search-book';
import { RouterLink } from '@angular/router';
import { Moon } from '../../../../core/icons/moon/moon';
import { Sun } from '../../../../core/icons/sun/sun';

@Component({
  selector: 'books-header-component',
  imports: [SearchBook, RouterLink, Moon, Sun],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly STORAGE_KEY = 'theme';

  theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
    this.applyTheme();
  }

  toggle() {
    const next = this.theme() === 'light' ? 'dark' : 'light';

    this.theme.set(next);

    localStorage.setItem(this.STORAGE_KEY, next);

    this.applyTheme();
  }

  private applyTheme() {
    const htmlEl = document.documentElement;
    htmlEl.classList.add('theme-transition');
    setTimeout(() => htmlEl.classList.remove('theme-transition'), 200);

    if (this.theme() === 'dark') htmlEl.classList.add('dark');
    else htmlEl.classList.remove('dark');
  }
}
