export interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}
