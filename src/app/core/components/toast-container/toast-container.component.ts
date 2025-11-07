import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { ToastType } from '../../models/toast-interface';
import { Success } from '../../icons/success/success';
import { Info } from '../../icons/info/info';
import { Warning } from '../../icons/warning/warning';
import { Error } from '../../icons/error/error';

@Component({
  selector: 'toast-container-component',
  standalone: true,
  imports: [CommonModule, Success, Info, Warning, Error],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  styleMap: Record<ToastType, { box: string; bar: string }> = {
    success: { box: 'bg-emerald-600', bar: 'bg-emerald-300' },
    error: { box: 'bg-red-600', bar: 'bg-red-300' },
    info: { box: 'bg-sky-600', bar: 'bg-sky-300' },
    warning: { box: 'bg-amber-500 text-black', bar: 'bg-amber-200' },
  };

  remove(id: string) {
    this.toastService.remove(id);
  }
}
