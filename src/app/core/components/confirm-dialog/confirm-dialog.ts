import {
  Component,
  DOCUMENT,
  effect,
  HostListener,
  inject,
  input,
  output,
  Renderer2,
} from '@angular/core';
import { ConfirmDialogConfig } from '../../models/confirm-dialog-config.interface';

@Component({
  selector: 'confirm-dialog-component',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);

  config = input.required<ConfirmDialogConfig>();
  isOpen = input.required<boolean>();

  confirmed = output<boolean>();
  closed = output<void>();

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    });
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.onCancel();
    }
  }

  protected getConfirmButtonClass(): string {
    const type = this.config().type ?? 'info';

    const typeClasses = {
      danger: 'bg-red-600 hover:bg-red-700',
      warning: 'bg-yellow-600 hover:bg-yellow-700',
      info: 'bg-blue-600 hover:bg-blue-700',
    };

    return typeClasses[type];
  }

  protected onConfirm(): void {
    this.confirmed.emit(true);
    this.closed.emit();
  }

  protected onCancel(): void {
    this.confirmed.emit(false);
    this.closed.emit();
  }

  protected onBackdropClick(): void {
    this.onCancel();
  }

  private disableBodyScroll(): void {
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
  }

  private enableBodyScroll(): void {
    this.renderer.removeStyle(this.document.body, 'overflow');
  }
}
