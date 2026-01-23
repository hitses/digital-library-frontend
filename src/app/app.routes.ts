import { Routes } from '@angular/router';
import { canActivateAuthGuard } from './core/guards/can-activate-auth.guard';

export const routes: Routes = [
  {
    path: 'dash',
    canActivate: [canActivateAuthGuard],
    loadChildren: () => import('./features/dash/dash.routes').then((r) => r.dashRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: 'gdpr',
    title: 'Protección de datos | I.E.S. Hermanos Amorós',
    loadComponent: () => import('./pages/gdpr/gdpr'),
  },
  {
    path: 'legal',
    title: 'Aviso Legal | I.E.S. Hermanos Amorós',
    loadComponent: () => import('./pages/legal/legal'),
  },
  {
    path: 'privacy',
    title: 'Política de privacidad | I.E.S. Hermanos Amorós',
    loadComponent: () => import('./pages/privacy/privacy'),
  },
  {
    path: '',
    title: 'Biblioteca Digital | I.E.S. Hermanos Amorós',
    loadChildren: () => import('./features/books/books.routes').then((r) => r.bookRoutes),
  },
  { path: '**', redirectTo: '' },
];
