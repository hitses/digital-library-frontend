import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth'),
    children: [
      {
        path: 'login',
        title: 'Biblioteca Digital - Iniciar Sesión | I.E.S. Biblioteca Digital',
        loadComponent: () => import('./pages/login/login'),
      },
      {
        path: 'forgot',
        title: 'Biblioteca Digital - Recuperar Contraseña | I.E.S. Biblioteca Digital',
        loadComponent: () => import('./pages/forgot/forgot'),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
