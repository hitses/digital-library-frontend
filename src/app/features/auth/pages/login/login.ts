import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { PASSWORD_PATTERN } from '../../../../core/patterns';
import { ToastService } from '../../../../core/services/toast';
import { ClosedEye } from '../../../../core/icons/closed-eye/closed-eye';
import { Eye } from '../../../../core/icons/eye/eye';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ClosedEye, Eye],
  templateUrl: './login.html',
  styles: ``,
})
export default class Login {
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly toastService = inject(ToastService);

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();

      return;
    }

    this.loading.set(true);
    this.error.set('');

    const { email, password } = this.loginForm.value;

    if (!email || !password) return;

    this.loginService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        this.loginService.isAuthenticated.set(true);

        this.router.navigateByUrl('/dash');
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403)
          this.toastService.error(
            'Credenciales incorrectas',
            'Revisa tus datos e inténtalo de nuevo.',
          );
        else
          this.toastService.error(
            'Error del servidor',
            'No se pudo iniciar sesión. Inténtalo más tarde.',
          );

        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
