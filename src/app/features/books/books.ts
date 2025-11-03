import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-books',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {}
