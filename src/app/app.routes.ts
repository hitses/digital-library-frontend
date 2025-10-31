import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/books/books.routes').then((r) => r.bookRoutes),
  },
  {
    path: 'dash',
    loadChildren: () => import('./features/dash/dash.routes').then((r) => r.dashRoutes),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.authRoutes),
  },
  { path: '**', redirectTo: '' },
];
