import { Component, input, output } from '@angular/core';
import { IReview } from '../../../../review/models/review.interface';
import { DatePipe } from '@angular/common';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { Pagination } from '../../../../../core/components/pagination/pagination';
import { Trash } from '../../../../../core/icons/trash/trash';
import { Edit } from '../../../../../core/icons/edit/edit';
import { EyeCheck } from '../../../../../core/icons/eye-check/eye-check';

@Component({
  selector: 'review-list-component',
  imports: [DatePipe, Spinner, Pagination, Trash, Edit, EyeCheck],
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
  allowCheck = input<boolean>(false);
  allowEdit = input<boolean>(false);
  allowDelete = input<boolean>(false);

  pageChange = output<number>();
  checkReview = output<string>();
  editReview = output<string>();
  deleteReview = output<{ id: string; name: string }>();

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onCheck(id: string): void {
    this.checkReview.emit(id);
  }

  onEdit(id: string): void {
    this.editReview.emit(id);
  }

  onDelete(id: string, name: string): void {
    this.deleteReview.emit({ id, name });
  }
}
