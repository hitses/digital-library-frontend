import { Component } from '@angular/core';
import { IFooterNavItem } from '../../models/footer-nav-item.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer-component',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styles: ``,
})
export class Footer {
  navItems: IFooterNavItem[] = [
    {
      label: 'Aviso legal',
      link: '/legal',
    },
    {
      label: 'Política de privacidad',
      link: '/privacy',
    },
    {
      label: 'Política de cookies',
      link: '/cookies',
    },
    {
      label: 'Accesibilidad',
      link: '/accessibility',
    },
  ];
}
