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
        path: 'books/new',
        title: 'Dashboard | Añadir libro',
        loadComponent: () => import('./pages/books/new-book/new-book'),
      },
      {
        path: 'books/edit/:id',
        title: 'Dashboard | Editar libro',
        loadComponent: () => import('./pages/books/edit-book/edit-book'),
      },
      {
        path: 'books/:id',
        title: 'Dashboard | Libro',
        loadComponent: () => import('./pages/books/book/book'),
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
