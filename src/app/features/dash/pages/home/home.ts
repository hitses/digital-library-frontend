import { Component } from '@angular/core';
import { Resume } from '../../components/home/resume/resume';
import { QuickActions } from '../../components/home/quick-actions/quick-actions';
import { Activity } from '../../components/home/activity/activity';

@Component({
  selector: 'app-home',
  imports: [Resume, QuickActions, Activity],
  templateUrl: './home.html',
  styles: ``,
})
export default class Home {}
