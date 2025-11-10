import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export default class Login {
  loading = signal(false);
  error = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();

      return;
    }

    this.loading.set(true);
    this.error.set('');

    await new Promise((r) => setTimeout(r, 900));

    const email = this.email.value;
    const pass = this.password.value;

    this.loading.set(false);
  }
}
