import { Routes } from '@angular/router';

export const dashRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash'),
    children: [
      {
        path: '',
        title: 'Dashboard | Inicio',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'books',
        title: 'Dashboard | Libros',
        loadComponent: () => import('./pages/books/books'),
      },
      {
        path: 'reviews',
        title: 'Dashboard | Reseñas',
        loadComponent: () => import('./pages/reviews/reviews'),
      },
      {
        path: 'settings',
        title: 'Dashboard | Ajustes',
        loadComponent: () => import('./pages/settings/settings'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
