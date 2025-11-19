import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth';
import { SearchBook } from '../../../books/components/search-book/search-book';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog';

@Component({
  selector: 'dash-header-component',
  imports: [RouterLink, RouterLinkActive, SearchBook],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly confirmDialog = inject(ConfirmDialogService);

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

  async logout() {
    const confirmed = await this.confirmDialog.confirmLogout();

    if (confirmed) {
      this.authService.logout();
    }
  }
}
