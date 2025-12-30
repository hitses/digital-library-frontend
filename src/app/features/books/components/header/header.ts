import { Component, computed, inject, signal } from '@angular/core';
import { SearchBook } from '../search-book/search-book';
import { RouterLink } from '@angular/router';
import { Moon } from '../../../../core/icons/moon/moon';
import { Sun } from '../../../../core/icons/sun/sun';
import { AuthService } from '../../../auth/services/auth';
import { Close } from '../../../../core/icons/close/close';
import { Menu } from '../../../../core/icons/menu/menu';
import { ThemeToggle } from '../../../../core/components/theme-toggle/theme-toggle';

@Component({
  selector: 'books-header-component',
  imports: [SearchBook, RouterLink, Close, Menu, ThemeToggle],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly STORAGE_KEY = 'theme';

  private readonly authService = inject(AuthService);

  // Estado para controlar si el menú móvil está abierto o cerrado
  isMenuOpen = signal(false);
  theme = signal<'light' | 'dark'>('light');
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
    this.applyTheme();
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleTheme() {
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
