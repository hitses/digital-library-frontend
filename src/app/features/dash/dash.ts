import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-dash',
  imports: [Header, Footer],
  templateUrl: './dash.html',
  styles: ``,
})
export default class Dash {}
