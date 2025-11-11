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
    path: '',
    loadChildren: () => import('./features/books/books.routes').then((r) => r.bookRoutes),
  },
  { path: '**', redirectTo: '' },
];
