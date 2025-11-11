import { Routes } from '@angular/router';

export const dashRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash'),
    children: [],
  },
  { path: '**', redirectTo: 'login' },
];
