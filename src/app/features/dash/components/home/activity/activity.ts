import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import '@github/relative-time-element';
import { HomeService } from '../../../services/home';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'activity-component',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './activity.html',
  styles: ``,
})
export class Activity {
  private readonly homeService = inject(HomeService);

  latestsBooks = computed(() => this.homeService.latestBooks());
  latestsReviews = computed(() => this.homeService.latestReviews());

  constructor() {
    this.homeService.getLatestBooks();
    this.homeService.getLatestReviews();
  }
}
