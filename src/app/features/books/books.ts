import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-books',
  imports: [RouterOutlet, Header],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {}
