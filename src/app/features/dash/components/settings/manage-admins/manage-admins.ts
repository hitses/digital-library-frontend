import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Admin } from '../../../services/admin';
import { ConfirmDialogService } from '../../../../../core/services/confirm-dialog';
import { ToastService } from '../../../../../core/services/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-admins',
  imports: [RouterLink],
  templateUrl: './manage-admins.html',
  styles: ``,
})
export default class ManageAdmins implements OnInit {
  protected readonly adminService = inject(Admin);
  private readonly confirmDialog = inject(ConfirmDialogService);
  private readonly toast = inject(ToastService);

  admins = computed(() => this.adminService.admins());
  me = computed(() => this.adminService.admin());

  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchAdmins();
  }

  fetchAdmins(): void {
    this.loading.set(true);
    this.adminService.getMe();
    this.adminService.findAll();
  }

  async deleteAdmin(id: string): Promise<void> {
    const admin = this.admins()?.find((admin) => admin._id === id);
    // Primer aviso de borrado
    const confirmed = await this.confirmDialog.confirmDelete(
      `a ${admin?.name.toLocaleUpperCase()}`,
    );

    if (!confirmed) return;

    // Borrado
    this.adminService.delete(id);

    this.toast.success(
      'Administrador eliminado',
      `Administrador ${admin?.name.toLocaleUpperCase()} eliminado correctamente`,
    );

    this.fetchAdmins();
  }
}
