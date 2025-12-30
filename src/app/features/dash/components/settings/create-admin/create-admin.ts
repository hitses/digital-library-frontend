import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../../../services/admin';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'create-admin-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-admin.html',
})
export default class CreateAdmin {
  private readonly adminService = inject(Admin);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  // Se define el formulario con las validaciones obligatorias para cada campo
  adminForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Se gestiona el estado de carga durante el proceso de guardado
  loading = signal(false);

  onSubmit() {
    if (this.adminForm.valid) {
      this.loading.set(true);
      // Se procesa el envío de datos para la creación del nuevo administrador
      this.adminService.create(this.adminForm.value);

      this.toastService.success(
        'Administrador creado',
        'El administrador ha sido creado correctamente',
      );

      this.adminForm.reset();
      this.loading.set(false);
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}
