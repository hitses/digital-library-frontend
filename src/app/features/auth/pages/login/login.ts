import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PASSWORD_PATTERN } from '../../../../core/patterns';
import { ToastService } from '../../../../core/services/toast';
import { ClosedEye } from '../../../../core/icons/closed-eye/closed-eye';
import { Eye } from '../../../../core/icons/eye/eye';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ClosedEye, Eye],
  templateUrl: './login.html',
  styles: `
    input[type='checkbox']:checked {
      background-image: url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  `,
})
export default class Login implements OnInit {
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    rememberMe: new FormControl(false),
  });

  ngOnInit() {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

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

    const { email, password, rememberMe } = this.loginForm.value;

    if (!email || !password) return;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        // Guardar o remover el email según el checkbox de recordarme
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
        } else {
          localStorage.removeItem('savedEmail');
        }

        this.authService.isAuthenticated.set(true);

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
