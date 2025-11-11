import { Component, computed, inject } from '@angular/core';
import { ResumeCard } from '../resume-card/resume-card';
import { DashService } from '../../services/dash';

@Component({
  selector: 'dash-home-resume-component',
  imports: [ResumeCard],
  templateUrl: './home-resume.html',
  styles: ``,
})
export class HomeResume {
  private readonly dashService = inject(DashService);

  resumeData = computed(() => [
    { title: 'Total de libros', metric: this.dashService.totalBooks() },
    { title: 'Reseñas publicadas', metric: this.dashService.totalReviews() },
    { title: 'Reseñas pendientes', metric: this.dashService.pendingReviews() },
  ]);

  constructor() {
    this.dashService.getTotalBooks();
    this.dashService.getTotalReviews();
    this.dashService.getPendingReviews();
  }
}
