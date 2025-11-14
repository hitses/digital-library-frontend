import { Component, input } from '@angular/core';

@Component({
  selector: 'spinner-component',
  imports: [],
  templateUrl: './spinner.html',
  styles: ``,
})
export class Spinner {
  text = input<string>('Cargando...');
}
