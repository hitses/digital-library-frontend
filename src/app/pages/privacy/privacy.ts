import { Component } from '@angular/core';
import { Header } from '../../features/books/components/header/header';
import { Footer } from '../../features/books/components/footer/footer';

@Component({
  selector: 'privacy-page',
  imports: [Header, Footer],
  templateUrl: './privacy.html',
})
export default class Privacy {}
