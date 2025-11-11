import { Component, computed, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ResumeCard } from './components/resume-card/resume-card';
import { DashService } from './services/dash';

@Component({
  selector: 'app-dash',
  imports: [Header, Footer, ResumeCard],
  templateUrl: './dash.html',
  styles: ``,
})
export default class Dash {
  private readonly dashService = inject(DashService);

  resumeData = computed(() => [
    { title: 'Total de libros', metric: this.dashService.totalBooks() },
    { title: 'Reseñas publicadas', metric: this.dashService.totalReviews() },
    { title: 'Reseñas pendientes', metric: 532 },
  ]);

  constructor() {
    this.dashService.getTotalBooks();
    this.dashService.getTotalReviews();
  }
}
