import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './core/components/toast-container/toast-container.component';
import { ConfirmDialog } from './core/components/confirm-dialog/confirm-dialog';
import { ConfirmDialogService } from './core/services/confirm-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent, ConfirmDialog],
  templateUrl: './app.html',
})
export class App {
  protected confirmDialog = inject(ConfirmDialogService);

  protected onDialogResult(confirmed: boolean): void {
    this.confirmDialog.close(confirmed);
  }

  protected onDialogClosed(): void {
    // Optional: aditional actions on close
  }
}
