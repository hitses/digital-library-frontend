import { Component, input, output } from '@angular/core';
import { IReview } from '../../../../review/models/review.interface';
import { DatePipe } from '@angular/common';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { Pagination } from '../../../../../core/components/pagination/pagination';

@Component({
  selector: 'review-list-component',
  imports: [DatePipe, Spinner, Pagination],
  templateUrl: './review-list.html',
  styles: ``,
})
export class ReviewList {
  reviews = input.required<IReview[]>();
  title = input.required<string>();
  total = input.required<number>();
  loading = input<boolean>(false);
  page = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
