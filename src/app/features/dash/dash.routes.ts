import { Routes } from '@angular/router';
import { passwordRequirementGuard } from '../../core/guards/can-activate-password-requirement.guard';

export const dashRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash'),
    children: [
      {
        path: '',
        title: 'Dashboard | Inicio',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'books',
        title: 'Dashboard | Libros',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/books'),
      },
      {
        path: 'books/new',
        title: 'Dashboard | Añadir libro',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/new-book/new-book'),
      },
      {
        path: 'books/edit/:id',
        title: 'Dashboard | Editar libro',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/edit-book/edit-book'),
      },
      {
        path: 'books/:id',
        title: 'Dashboard | Libro',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/book/book'),
      },
      {
        path: 'reviews',
        title: 'Dashboard | Reseñas',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/reviews/reviews'),
      },
      {
        path: 'settings',
        title: 'Dashboard | Ajustes',
        loadComponent: () => import('./pages/settings/settings'),
        children: [
          {
            path: 'change-password',
            title: 'Dashboard | Cambiar Contraseña',
            loadComponent: () => import('./components/settings/change-password/change-password'),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
