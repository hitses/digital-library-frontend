import { Component, computed, inject } from '@angular/core';
import { HomeService } from '../../../services/home';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'quick-actions-component',
  imports: [RouterLink],
  templateUrl: './quick-actions.html',
  styles: ``,
})
export class QuickActions {
  private readonly homeService = inject(HomeService);

  pendingReviews = computed(() => this.homeService.pendingReviews());

  constructor() {
    this.homeService.getTotalReviews();
  }
}
