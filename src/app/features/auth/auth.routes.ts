import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login'),
      },
      {
        path: 'forgot',
        loadComponent: () => import('./pages/forgot/forgot'),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
