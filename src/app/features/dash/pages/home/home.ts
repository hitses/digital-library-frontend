import { Component, computed, inject } from '@angular/core';
import { DashService } from '../../services/dash';
import { HomeResume } from '../../components/home-resume/home-resume';

@Component({
  selector: 'app-home',
  imports: [HomeResume],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home {}
