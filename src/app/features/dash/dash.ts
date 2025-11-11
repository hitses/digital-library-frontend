import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dash',
  imports: [Header, Footer, RouterModule],
  templateUrl: './dash.html',
  styles: ``,
})
export default class Dash {}
