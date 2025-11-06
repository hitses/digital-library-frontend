import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'pagination-component',
  imports: [NgClass],
  templateUrl: './pagination.html',
  styles: ``,
})
export class Pagination {
  page = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages() || p === this.page()) return;
    this.pageChange.emit(p);
  }

  middlePages = computed(() => {
    const current = this.page();
    const total = this.totalPages();
    const list: number[] = [];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) list.push(i);
    return list;
  });

  trackByPage = (i: number, page: number) => page;
}
