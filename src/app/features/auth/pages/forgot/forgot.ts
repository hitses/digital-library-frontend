import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../services/forgot';
import { IForgotResponse } from '../../models/forgotResponse.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot.html',
  styles: ``,
})
export default class Forgot {
  loading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly forgotService = inject(ForgotService);

  forgotResponse: WritableSignal<IForgotResponse | null> = this.forgotService.forgotResponse;
  error: WritableSignal<string | number> = this.forgotService.error;

  forgotForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.forgotForm.get('email') as FormControl;
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.email.markAsTouched();

      return;
    }

    this.loading.set(true);
    this.error.set('');

    const email = this.email.value;

    this.forgotService.forgotPassword(email!);

    this.loading.set(false);
  }
}
