import { Component, input } from '@angular/core';

@Component({
  selector: 'dash-resume-card-component',
  imports: [],
  templateUrl: './resume-card.html',
  styles: ``,
})
export class ResumeCard {
  title = input.required<string>();
  metric = input.required<number | null>();
}
