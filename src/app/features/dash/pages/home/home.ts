import { Component, computed, inject } from '@angular/core';
import { DashService } from '../../services/dash';
import { ResumeCard } from '../../components/resume-card/resume-card';

@Component({
  selector: 'app-home',
  imports: [ResumeCard],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home {
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
