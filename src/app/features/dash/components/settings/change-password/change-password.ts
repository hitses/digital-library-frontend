import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from '../../../../auth/services/password';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../../core/validators/password-match.validator';
import { ClosedEye } from '../../../../../core/icons/closed-eye/closed-eye';
import { Eye } from '../../../../../core/icons/eye/eye';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'change-password-component',
  imports: [ReactiveFormsModule, ClosedEye, Eye],
  templateUrl: './change-password.html',
  styles: ``,
})
export default class ChangePassword {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly passwordService = inject(Password);
  private readonly toastService = inject(ToastService);

  isLoading = signal<boolean>(false);
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [passwordMatchValidator] },
  );

  toggleCurrent() {
    this.showCurrent.set(!this.showCurrent());
  }

  toggleNew() {
    this.showNew.set(!this.showNew());
  }

  toggleConfirm() {
    this.showConfirm.set(!this.showConfirm());
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();

      return;
    }

    this.isLoading.set(true);

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();

    this.passwordService.changePassword({ currentPassword, newPassword }).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        this.toastService.success(
          'Contraseña actualizada',
          'Tu contraseña se ha cambiado correctamente.',
        );

        this.passwordForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);

        const message = 'Error al cambiar la contraseña. Inténtalo de nuevo más tarde.';

        this.toastService.error('No se ha podido actualizar la contraseña', message);
      },
    });
  }

  get currentPasswordControl() {
    return this.passwordForm.controls.currentPassword;
  }
  get newPasswordControl() {
    return this.passwordForm.controls.newPassword;
  }
  get confirmPasswordControl() {
    return this.passwordForm.controls.confirmPassword;
  }

  get currentPasswordError() {
    return this.currentPasswordControl.touched && this.currentPasswordControl.hasError('required');
  }

  get newPasswordError() {
    const c = this.newPasswordControl;
    return c.touched && (c.hasError('required') || c.hasError('minlength'));
  }

  get confirmPasswordError() {
    const c = this.confirmPasswordControl;
    return (
      (c.touched && c.hasError('required')) || (this.passwordForm.hasError('mismatch') && c.touched)
    );
  }
}
