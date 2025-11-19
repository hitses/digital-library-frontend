import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) return null;

  // Si la confirmación está vacía o ya tiene otro error, no interferir
  if (confirmPassword.errors && !confirmPassword.errors['mismatch']) return null;

  return newPassword.value === confirmPassword.value ? null : { mismatch: true };
};
