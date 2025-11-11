import { Component } from '@angular/core';

@Component({
  selector: 'dash-footer-component',
  imports: [],
  templateUrl: './footer.html',
  styles: ``,
})
export class Footer {
  defaultYear = new Date().getFullYear();
}
