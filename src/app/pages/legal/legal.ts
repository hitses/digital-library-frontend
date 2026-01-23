import { Component } from '@angular/core';
import { Header } from '../../features/books/components/header/header';
import { Footer } from '../../features/books/components/footer/footer';

@Component({
  selector: 'legal-page',
  imports: [Header, Footer],
  templateUrl: './legal.html',
})
export default class Legal {}
