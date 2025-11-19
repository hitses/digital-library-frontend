import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from '../../../../auth/services/password';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../../core/validators/password-match.validator';

@Component({
  selector: 'change-password-component',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styles: ``,
})
export default class ChangePassword {
  private readonly fb = inject(FormBuilder);
  private readonly passwordService = inject(Password);
  private readonly router = inject(Router);

  isLoading = signal<boolean>(false);
  statusMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.statusMessage.set(null);

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();

    this.passwordService.changePassword({ currentPassword, newPassword }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.statusMessage.set({ type: 'success', text: response.message });
        this.passwordForm.reset();

        // Opcional: Redirigir al Dashboard principal tras unos segundos si todo sale bien
        setTimeout(() => this.router.navigate(['/dash']), 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.message || 'Error al cambiar la contraseña.';
        this.statusMessage.set({ type: 'error', text: errorMsg });
      },
    });
  }

  // Getters (igual que antes)
  get currentPasswordError() {
    const control = this.passwordForm.controls.currentPassword;
    return control.touched && control.hasError('required');
  }
  get newPasswordError() {
    const control = this.passwordForm.controls.newPassword;
    return control.touched && (control.hasError('required') || control.hasError('minlength'));
  }
  get confirmPasswordError() {
    const control = this.passwordForm.controls.confirmPassword;
    return (
      (control.touched && control.hasError('required')) ||
      (this.passwordForm.hasError('mismatch') && control.touched)
    );
  }
}
