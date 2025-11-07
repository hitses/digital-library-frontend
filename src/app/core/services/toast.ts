import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast-interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();

  private add(type: ToastType, title: string, body: string, duration = 5000, url?: string) {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    const toast: Toast = {
      id,
      title,
      body,
      type,
      duration,
      timestamp,
      url,
    };

    this._toasts.update((t) => [...t, toast]);

    setTimeout(() => this.remove(id), duration);

    return id;
  }

  success(title: string, body: string, duration?: number, url?: string) {
    return this.add('success', title, body, duration, url);
  }

  error(title: string, body: string, duration?: number, url?: string) {
    return this.add('error', title, body, duration, url);
  }

  info(title: string, body: string, duration?: number, url?: string) {
    return this.add('info', title, body, duration, url);
  }

  warning(title: string, body: string, duration?: number, url?: string) {
    return this.add('warning', title, body, duration, url);
  }

  remove(id: string) {
    this._toasts.update((t) => t.filter((x) => x.id !== id));
  }
}
