import { Component, signal } from '@angular/core';
import { Sun } from '../../icons/sun/sun';
import { Moon } from '../../icons/moon/moon';

@Component({
  selector: 'theme-toggle-component',
  imports: [Sun, Moon],
  templateUrl: './theme-toggle.html',
  styles: ``,
})
export class ThemeToggle {
  private readonly STORAGE_KEY = 'theme';

  theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
    this.applyTheme();
  }

  toggle() {
    const next = this.theme() === 'light' ? 'dark' : 'light';

    this.theme.set(next);

    localStorage.setItem(this.STORAGE_KEY, next);

    this.applyTheme();
  }

  private applyTheme() {
    const htmlEl = document.documentElement;
    htmlEl.classList.add('theme-transition');
    setTimeout(() => htmlEl.classList.remove('theme-transition'), 200);

    if (this.theme() === 'dark') htmlEl.classList.add('dark');
    else htmlEl.classList.remove('dark');
  }
}
