import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  const injector = inject(Injector);

  const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(cloned).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403))
          if (!req.url.includes('/auth/login')) {
            const authService = injector.get(AuthService);

            authService.logout();
          }
      },
    }),
  );
};
