import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth';
import { SearchBook } from '../../../books/components/search-book/search-book';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog';
import { Menu } from '../../../../core/icons/menu/menu';
import { Close } from '../../../../core/icons/close/close';
import { ThemeToggle } from '../../../../core/components/theme-toggle/theme-toggle';

@Component({
  selector: 'dash-header-component',
  imports: [RouterLink, RouterLinkActive, SearchBook, Menu, Close, ThemeToggle],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly confirmDialog = inject(ConfirmDialogService);

  isMenuOpen = signal(false);

  navLinks = [
    {
      label: 'Inicio',
      link: '/dash',
    },
    {
      label: 'Libros',
      link: '/dash/books',
    },
    {
      label: 'Reseñas',
      link: '/dash/reviews',
    },
    {
      label: 'Ajustes',
      link: '/dash/settings',
    },
  ];

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }

  async logout() {
    const confirmed = await this.confirmDialog.confirmLogout();

    if (confirmed) {
      this.authService.logout();
    }
  }
}
