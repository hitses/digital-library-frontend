import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'resume-card-component',
  imports: [RouterLink],
  templateUrl: './resume-card.html',
  styles: ``,
})
export class ResumeCard {
  title = input.required<string>();
  metric = input.required<number | null>();
  link = input<string>();
}
