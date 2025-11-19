import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';

export const canActivateAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (!token) {
    authService.logout();

    return false;
  }

  return true;
};
