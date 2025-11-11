import { Component, computed, inject } from '@angular/core';
import { DashService } from '../../services/dash';
import { HomeResume } from '../../components/home-resume/home-resume';
import { HomeQuickActions } from '../../components/home-quick-actions/home-quick-actions';

@Component({
  selector: 'app-home',
  imports: [HomeResume, HomeQuickActions],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home {}
