import { inject, Injectable, signal } from '@angular/core';
import { AdminDto } from '../models/admin.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private readonly adminUrl = environment.apiUrl + '/admin';

  admin = signal<AdminDto | null>(null);
  admins = signal<AdminDto[]>([]);
  loading = signal(false);

  private readonly http = inject(HttpClient);

  getMe(): void {
    this.loading.set(true);

    this.http.get<AdminDto>(`${this.adminUrl}/me`).subscribe({
      next: (admin) => {
        this.admin.set(admin);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.admin.set(null);
        this.loading.set(false);
      },
    });
  }

  findAll(): void {
    this.loading.set(true);

    this.http.get<AdminDto[]>(`${this.adminUrl}`).subscribe({
      next: (admins: AdminDto[]) => {
        this.admins.set(admins);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.admin.set(null);
        this.loading.set(false);
      },
    });
  }

  updateMe(data: Partial<AdminDto>): void {
    this.loading.set(true);

    this.http.patch<AdminDto>(`${this.adminUrl}/${this.admin()?._id}`, data).subscribe({
      next: (admin) => {
        this.admin.set(admin);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.admin.set(null);
        this.loading.set(false);
      },
    });
  }

  delete(id: string): void {
    this.loading.set(true);

    this.http.delete(`${this.adminUrl}/${id}`).subscribe({
      next: () => {
        this.admins.set(this.admins().filter((admin) => admin._id !== id));
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  clearAdmin(): void {
    this.admin.set(null);
  }
}
