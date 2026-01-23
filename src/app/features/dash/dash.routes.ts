import { Routes } from '@angular/router';
import { passwordRequirementGuard } from '../../core/guards/can-activate-password-requirement.guard';

export const dashRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash'),
    children: [
      {
        path: '',
        title: 'Biblioteca Digital - Panel de control - Inicio | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'books',
        title: 'Biblioteca Digital - Panel de control - Libros | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/books'),
        children: [
          {
            path: '',
            title: 'Biblioteca Digital - Panel de control - Libros | I.E.S. Hermanos Amorós',
            canActivate: [passwordRequirementGuard],
            loadComponent: () => import('./components/books/all/all'),
          },
          {
            path: 'featured',
            title:
              'Biblioteca Digital - Panel de control - Libros destacados | I.E.S. Hermanos Amorós',
            canActivate: [passwordRequirementGuard],
            loadComponent: () => import('./components/books/featured/featured'),
          },
          {
            path: 'reviewless',
            title:
              'Biblioteca Digital - Panel de control - Libros sin reseñas | I.E.S. Hermanos Amorós',
            canActivate: [passwordRequirementGuard],
            loadComponent: () => import('./components/books/reviewless/reviewless'),
          },
        ],
      },
      {
        path: 'books/new',
        title: 'Biblioteca Digital - Panel de control - Añadir libro | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/new-book/new-book'),
      },
      {
        path: 'books/edit/:id',
        title: 'Biblioteca Digital - Panel de control - Editar libro | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/edit-book/edit-book'),
      },
      {
        path: 'books/:id',
        title: 'Biblioteca Digital - Panel de control - Libro | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/books/book/book'),
      },
      {
        path: 'reviews',
        title: 'Biblioteca Digital - Panel de control - Reseñas | I.E.S. Hermanos Amorós',
        canActivate: [passwordRequirementGuard],
        loadComponent: () => import('./pages/reviews/reviews'),
      },
      {
        path: 'settings',
        title: 'Biblioteca Digital - Panel de control - Ajustes | I.E.S. Hermanos Amorós',
        loadComponent: () => import('./pages/settings/settings'),
        children: [
          {
            path: '',
            title: 'Biblioteca Digital - Panel de control - Ajustes | I.E.S. Hermanos Amorós',
            loadComponent: () => import('./components/settings/home/home'),
          },
          {
            path: 'change-password',
            title:
              'Biblioteca Digital - Panel de control - Cambiar Contraseña | I.E.S. Hermanos Amorós',
            loadComponent: () => import('./components/settings/change-password/change-password'),
          },
          {
            path: 'manage-admins',
            title:
              'Biblioteca Digital - Panel de control - Gestionar administradores | I.E.S. Hermanos Amorós',
            canActivate: [passwordRequirementGuard],
            loadComponent: () => import('./components/settings/manage-admins/manage-admins'),
          },
          {
            path: 'manage-admins/create',
            title:
              'Biblioteca Digital - Panel de control - Crear administrador | I.E.S. Hermanos Amorós',
            canActivate: [passwordRequirementGuard],
            loadComponent: () => import('./components/settings/create-admin/create-admin'),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
