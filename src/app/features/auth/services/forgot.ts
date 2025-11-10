import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IForgotResponse } from '../models/forgotResponse.interface';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  private readonly apiUrl = environment.apiUrl + '/auth';

  private http = inject(HttpClient);

  forgotResponse = signal<IForgotResponse | null>(null);
  error = signal<string>('');

  forgotPassword(email: string): void {
    this.http.patch<IForgotResponse>(`${this.apiUrl}/forgot`, { email }).subscribe({
      next: (res) => this.forgotResponse.set(res),
      error: (err) => {
        this.error.set(err.status);

        console.error(err);

        return null;
      },
    });
  }
}
