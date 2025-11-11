import { Component, computed, inject } from '@angular/core';
import { DashService } from '../../services/dash';
import { HomeResume } from '../../components/home-resume/home-resume';
import { HomeQuickActions } from '../../components/home-quick-actions/home-quick-actions';
import { HomeActivity } from '../../components/home-activity/home-activity';

@Component({
  selector: 'app-home',
  imports: [HomeResume, HomeQuickActions, HomeActivity],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home {}
