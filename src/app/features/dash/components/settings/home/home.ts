import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { Admin } from '../../../services/admin';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-home',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home implements OnDestroy {
  private readonly adminService = inject(Admin);
  private readonly toastService = inject(ToastService);

  admin = computed(() => this.adminService.admin());

  isEditing = signal<boolean>(false);

  // Formulario temporal para la edición del perfil
  editForm = { name: '', email: '' };

  constructor() {
    effect(() => {
      this.adminService.getMe();
    });
  }

  onEdit(): void {
    const current = this.admin();

    if (current) {
      // Se vuelcan los datos actuales: el nombre se devuelve a su estado original para editar
      this.editForm = { name: current.name, email: current.email };

      this.isEditing.set(true);
    }
  }

  onCancel(): void {
    this.isEditing.set(false);
  }

  onSave(): void {
    // Se envían los datos actuales
    this.adminService.updateMe(this.editForm);

    // Se muestra un mensaje de éxito
    this.toastService.success(
      'Perfil actualizado',
      'Has actualizado tu información de perfil correctamente',
    );

    // Tras el éxito, la renovación de la señal admin obligará a la vista a actualizarse
    this.isEditing.set(false);
  }

  ngOnDestroy(): void {
    this.adminService.clearAdmin();
  }
}
