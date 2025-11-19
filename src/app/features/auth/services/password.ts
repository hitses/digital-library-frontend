import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from '../models/change-password.dto';

@Injectable({
  providedIn: 'root',
})
export class Password {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  changePassword(data: ChangePasswordDto): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.baseUrl}/change-password`, data);
  }
}
