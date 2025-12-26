import { Component, computed, inject } from '@angular/core';
import { ResumeCard } from '../resume-card/resume-card';
import { HomeService } from '../../../services/home';

@Component({
  selector: 'resume-component',
  imports: [ResumeCard],
  templateUrl: './resume.html',
  styles: ``,
})
export class Resume {
  private readonly homeService = inject(HomeService);

  resumeData = computed(() => [
    {
      title: 'Total de libros',
      metric: this.homeService.totalBooks(),
      link: '/dash/books',
    },
    {
      title: 'Reseñas publicadas',
      metric: this.homeService.totalReviews(),
      link: '/dash/reviews',
    },
    {
      title: 'Reseñas pendientes',
      metric: this.homeService.pendingReviews(),
      link: '/dash/reviews',
      queryParams: { pending: 'true' },
    },
  ]);

  constructor() {
    this.homeService.getTotalBooks();
    this.homeService.getTotalReviews();
    this.homeService.getPendingReviews();
  }
}
