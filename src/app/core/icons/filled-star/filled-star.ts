import { Component, input } from '@angular/core';

@Component({
  selector: 'filled-star-icon',
  imports: [],
  templateUrl: './filled-star.html',
  styles: ``,
})
export class FilledStar {
  size = input<number>(16);
}
