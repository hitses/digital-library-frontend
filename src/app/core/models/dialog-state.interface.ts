import { ConfirmDialogConfig } from './confirm-dialog-config.interface';

export interface DialogState {
  isOpen: boolean;
  config: ConfirmDialogConfig | null;
  resolve: ((value: boolean) => void) | null;
}
