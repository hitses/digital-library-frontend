import { Injectable, signal } from '@angular/core';
import { DialogState } from '../models/dialog-state.interface';
import { ConfirmDialogConfig } from '../models/confirm-dialog-config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialogState = signal<DialogState>({
    isOpen: false,
    config: null,
    resolve: null,
  });

  readonly isOpen = signal(false);
  readonly config = signal<ConfirmDialogConfig>({
    title: '',
    message: '',
  });

  confirm(config: ConfirmDialogConfig): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.isOpen.set(true);
      this.config.set(config);
      this.dialogState.update((state) => ({
        ...state,
        isOpen: true,
        config,
        resolve,
      }));
    });
  }

  close(confirmed: boolean): void {
    const state = this.dialogState();
    if (state.resolve) {
      state.resolve(confirmed);
    }

    this.isOpen.set(false);
    this.dialogState.set({
      isOpen: false,
      config: null,
      resolve: null,
    });
  }

  confirmDelete(itemName: string = 'este elemento'): Promise<boolean> {
    return this.confirm({
      title: 'Confirmar eliminación',
      message: `Se va a eliminar ${itemName}. Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger',
    });
  }

  confirmLogout(): Promise<boolean> {
    return this.confirm({
      title: '¿Cerrar sesión?',
      message: '¿Estás seguro de que deseas cerrar tu sesión?',
      confirmText: 'Cerrar sesión',
      cancelText: 'Cancelar',
      type: 'warning',
    });
  }
}
