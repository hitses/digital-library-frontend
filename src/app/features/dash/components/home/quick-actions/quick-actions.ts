import { Component, computed, inject } from '@angular/core';
import { HomeService } from '../../../services/home';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'quick-actions-component',
  imports: [RouterLink],
  templateUrl: './quick-actions.html',
  styles: ``,
})
export class QuickActions {
  private readonly homeService = inject(HomeService);
  private readonly router = inject(Router);

  pendingReviews = computed(() => this.homeService.pendingReviews());

  constructor() {
    this.homeService.getTotalReviews();
  }

  navigateToPending() {
    // Se navega a la sección de reseñas pasando el filtro por la URL: es obligatorio para activar el check
    this.router.navigate(['/dash/reviews'], { queryParams: { pending: 'true' } });
  }
}
