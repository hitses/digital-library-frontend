import { Component, computed, effect, inject, OnDestroy } from '@angular/core';
import { Admin } from '../../../services/admin';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home implements OnDestroy {
  private readonly adminService = inject(Admin);

  admin = computed(() => this.adminService.admin());

  constructor() {
    effect(() => {
      this.adminService.getMe();
    });
  }

  ngOnDestroy(): void {
    this.adminService.clearAdmin();
  }
}
