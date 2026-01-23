import { Component } from '@angular/core';
import { Header } from '../../features/books/components/header/header';
import { Footer } from '../../features/books/components/footer/footer';

@Component({
  selector: 'gdpr-page',
  imports: [Header, Footer],
  templateUrl: './gdpr.html',
})
export default class Gdpr {}
