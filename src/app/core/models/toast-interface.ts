export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  body: string;
  type: ToastType;
  duration: number;
  timestamp: number;
  url?: string;
}
