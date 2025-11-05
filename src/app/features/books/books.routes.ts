import { Routes } from '@angular/router';

export const bookRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./books'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/detail/detail'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
