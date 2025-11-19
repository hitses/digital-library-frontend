import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth';

export const passwordRequirementGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Si ya se navega a la página de cambio de contraseña, permitir pasar para evitar bucle
  if (state.url.includes('/dash/settings/change-password')) return true;

  return authService.checkSession().pipe(
    map(() => true),
    catchError((err: HttpErrorResponse) => {
      if (
        err.status === 403 &&
        err.error?.message === 'Password change required before proceeding'
      ) {
        // Redirigir antes de que cargue el componente
        router.navigate(['/dash/settings/change-password']);

        return of(false);
      }

      return of(true);
    }),
  );
};
