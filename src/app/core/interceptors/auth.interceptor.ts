import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  const router = inject(Router);
  const injector = inject(Injector);

  const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(cloned).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          // Cambio de contraseña obligatorio
          // Verificar el status 403 y el mensaje específico que envía el backend
          if (
            err.status === 403 &&
            err.error?.message === 'Password change required before proceeding'
          ) {
            if (!router.url.includes('/dash/settings')) router.navigate(['/dash/settings']);

            return;
          }

          // Token inválido, expirado o acceso prohibido genérico
          // Ignorar errores que vengan del propio endpoint de login para dejar que el componente maneje "usuario incorrecto"
          if ((err.status === 401 || err.status === 403) && !req.url.includes('/auth/login')) {
            const authService = injector.get(AuthService);
            authService.logout();
          }
        }
      },
    }),
  );
};
