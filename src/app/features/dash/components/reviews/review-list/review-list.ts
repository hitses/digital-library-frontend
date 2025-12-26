import { Component, input, output, signal } from '@angular/core';
import { IReview } from '../../../../review/models/review.interface';
import { DatePipe } from '@angular/common';
import { Spinner } from '../../../../../core/components/spinner/spinner';
import { Pagination } from '../../../../../core/components/pagination/pagination';
import { Trash } from '../../../../../core/icons/trash/trash';
import { Edit } from '../../../../../core/icons/edit/edit';
import { EyeCheck } from '../../../../../core/icons/eye-check/eye-check';
import { Success } from '../../../../../core/icons/success/success';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'review-list-component',
  imports: [FormsModule, DatePipe, Spinner, Pagination, Trash, Edit, EyeCheck, Success],
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
  saveReview = output<{ id: string; data: Partial<IReview> }>();
  deleteReview = output<{ id: string; name: string }>();

  // Se gestiona el estado de edición local: el identificador de la reseña en edición
  editingId = signal<string | null>(null);
  // Se almacenan los cambios temporales: los datos del borrador son obligatorios para editar
  editDraft = signal<Partial<IReview>>({});

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onCheck(id: string): void {
    this.checkReview.emit(id);
  }

  onEdit(review: IReview): void {
    // Se activa el modo edición para la reseña: se copian los valores actuales al borrador
    this.editingId.set(review._id);
    this.editDraft.set({
      name: review.name,
      email: review.email,
      review: review.review,
    });
  }

  onSave(): void {
    const id = this.editingId();

    if (id) {
      // Se emiten los cambios al componente padre: el objeto con los datos es obligatorio
      this.saveReview.emit({ id, data: this.editDraft() });
      // Se limpia el estado de edición: se devuelve el componente a su estado inicial
      this.editingId.set(null);
    }
  }

  onDelete(id: string, name: string): void {
    this.deleteReview.emit({ id, name });
  }
}
