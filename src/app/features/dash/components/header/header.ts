import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../auth/services/login';
import { SearchBook } from '../../../books/components/search-book/search-book';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog';

@Component({
  selector: 'dash-header-component',
  imports: [RouterLink, RouterLinkActive, SearchBook],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
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

    if (!confirmed) return;
    else {
      localStorage.removeItem('token');

      this.loginService.isAuthenticated.set(false);

      this.router.navigate(['/']);
    }
  }
}
