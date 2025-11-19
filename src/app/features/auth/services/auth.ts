import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  isAuthenticated = signal<boolean>(false);

  constructor() {
    const token = localStorage.getItem('token');

    if (token) this.isAuthenticated.set(true);
  }

  login(email: string, password: string) {
    return this.http.post<{ id: string; email: string; token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.isAuthenticated.set(false);

    this.router.navigate(['/']);
  }

  checkSession(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/check-session`);
  }
}
