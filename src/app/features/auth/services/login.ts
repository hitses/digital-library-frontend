import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly http = inject(HttpClient);

  isAuthenticated = signal<boolean>(false);

  login(email: string, password: string) {
    return this.http.post<{ id: string; email: string; token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }
}
