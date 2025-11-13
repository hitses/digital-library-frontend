import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'dash-header-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
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

  private readonly router = inject(Router);

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }
}
