import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-1 min-h-0',
  },
})
export default class Settings {
  navItems = [
    { label: 'Inicio', link: './' },
    { label: 'Cambiar contraseña', link: './change-password' },
    { label: 'Gestionar administradores', link: './manage-admins' },
  ];
}
