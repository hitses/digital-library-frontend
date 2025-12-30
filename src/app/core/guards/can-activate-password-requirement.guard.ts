import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth';

// Se comprueba si la renovación de contraseña es obligatoria antes de acceder
export const passwordRequirementGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Se permite el paso si ya se encuentra en la ruta de cambio de contraseña
  if (state.url.includes('/dash/settings/change-password')) return true;

  return authService.checkSession().pipe(
    map(() => true),
    catchError((err: HttpErrorResponse) => {
      // Si el servidor devuelve un 403 específico, se obliga a cambiar la clave
      if (
        err.status === 403 &&
        err.error?.message === 'Password change required before proceeding'
      ) {
        router.navigate(['/dash/settings/change-password']);

        return of(false);
      }

      return of(true);
    }),
  );
};
