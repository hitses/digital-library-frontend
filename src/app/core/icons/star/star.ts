import { Component, input } from '@angular/core';

@Component({
  selector: 'star-icon',
  imports: [],
  templateUrl: './star.html',
  styles: ``,
})
export class Star {
  size = input<number>(16);
}
