import { Component, inject, OnInit, signal } from '@angular/core';
import { DashReviewsService } from '../../services/reviews';
import { IReview } from '../../../review/models/review.interface';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { Spinner } from '../../../../core/components/spinner/spinner';
import { IBook } from '../../../books/models/book.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../../core/services/toast';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog';
import { Success } from '../../../../core/icons/success/success';
import { FormsModule } from '@angular/forms';
import { Error } from '../../../../core/icons/error/error';

@Component({
  selector: 'app-reviews',
  imports: [Pagination, Spinner, RouterLink, Success, FormsModule, Error],
  templateUrl: './reviews.html',
  styles: ``,
})
export default class Reviews implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly reviewsService = inject(DashReviewsService);
  private readonly toastService = inject(ToastService);
  private readonly confirmDialog = inject(ConfirmDialogService);

  reviews = signal<IReview[]>([]);
  totalReviews = signal<number>(0);
  loading = signal<boolean>(false);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  onlyPending = signal<boolean>(false);
  editingReviewId = signal<string | null>(null);

  // Se almacenan los cambios temporales: se evita modificar la señal principal antes de guardar
  editForm = { name: '', email: '', review: '' };

  ngOnInit(): void {
    // Se comprueba si existe el parámetro 'pending' en la URL para activar el filtro inicial
    const isPending = this.route.snapshot.queryParamMap.get('pending');

    if (isPending === 'true') this.onlyPending.set(true);

    // Se inicia la carga de datos: el número de resultados dependerá del parámetro detectado
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.loading.set(true);

    // Se define si se filtran las reseñas por verificar: el parámetro es opcional en el servicio
    const verified = this.onlyPending() ? false : undefined;

    this.reviewsService.getAllReviews(this.page(), 10, verified).subscribe({
      next: (res) => {
        // Se actualizan los estados con la respuesta del servidor: se devuelve el listado y el número total
        this.reviews.set(res.data);
        this.totalReviews.set(res.total);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        // Se gestiona el error en la carga: se detiene el spinner para permitir reintentos
        console.error('Error en la renovación de reseñas:', err);
        this.loading.set(false);
      },
    });
  }

  toggleFilter(): void {
    // Se cambia el estado del filtro de pendientes: se devuelve la paginación al número uno
    this.onlyPending.update((v) => !v);
    this.page.set(1);
    this.fetchReviews();
  }

  onPageChange(newPage: number): void {
    // Se actualiza el número de página actual: la renovación de la tabla es obligatoria
    this.page.set(newPage);
    this.fetchReviews();
  }

  onVerify(id: string): void {
    // Se solicita la verificación de la reseña: es obligatorio para que sea pública en la web
    this.reviewsService.verifyReview(id).subscribe({
      next: () => {
        // Se informa del cambio de estado: la renovación de la lista permite ver el nuevo badge de 'Verificada'
        this.toastService.success(
          'Reseña publicada',
          'La reseña ahora es visible para todos los usuarios',
        );
        this.fetchReviews();
      },
      error: (err) => {
        // Se notifica el error en la verificación: se devuelve un mensaje informativo al administrador
        this.toastService.error('Error', 'No se pudo verificar la reseña');
        console.error('Error en la verificación:', err);
      },
    });
  }

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    // Se resetea la altura para calcular el scrollHeight real
    textarea.style.height = 'auto';
    // Se asigna el nuevo número de píxeles basado en el contenido: es obligatorio para el efecto automático
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onEdit(review: IReview): void {
    // Se inicia el modo edición: se vuelcan los datos originales al formulario temporal
    this.editingReviewId.set(review._id);
    this.editForm = {
      name: review.name,
      email: review.email,
      review: review.review,
    };

    // Se espera al siguiente ciclo para que el textarea exista en el DOM y se pueda renovar su altura
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, 0);
  }

  onCancelEdit(): void {
    // Se anula la edición: la renovación de la fila al estado original es inmediata
    this.editingReviewId.set(null);
  }

  onSaveEdit(id: string): void {
    // Se envían los cambios al servicio: el objeto parcial es obligatorio para la actualización
    this.reviewsService.updateReview(id, this.editForm).subscribe({
      next: () => {
        this.toastService.success('Cambios guardados', 'La reseña se ha actualizado correctamente');
        this.editingReviewId.set(null);
        this.fetchReviews(); // Renovación de la lista para ver los datos frescos
      },
      error: () => this.toastService.error('Error', 'No se pudieron guardar los cambios'),
    });
  }

  async onDeleteReview(id: string, name: string): Promise<void> {
    // Se solicita confirmación al administrador: es obligatorio evitar borrados accidentales
    const confirmed = await this.confirmDialog.confirmDelete(`la reseña de ${name.toUpperCase()}`);

    if (!confirmed) return;
    else {
      this.reviewsService.deleteReview(id).subscribe({
        next: () => {
          // Se informa del éxito mediante un mensaje: la renovación de la lista es inmediata
          this.toastService.success('Reseña eliminada', 'Reseña eliminada correctamente');
          this.fetchReviews();

          // Si al borrar se queda la página vacía, se devuelve al usuario a la página anterior si es posible
          if (this.reviews().length === 1 && this.page() > 1) {
            this.page.update((p) => p - 1);
            this.fetchReviews();
          }
        },
        error: (err) => {
          // Se notifica el fallo en la operación: el servidor devuelve el motivo del error
          this.toastService.error(
            'Error al eliminar la reseña',
            'Se ha producido un error al eliminar la reseña',
          );
          console.error('Error en la eliminación:', err);
        },
      });
    }
  }

  asBook(book: string | IBook): IBook {
    // Se realiza la conversión de tipo para TypeScript: es obligatorio para acceder a las propiedades del objeto
    return book as IBook;
  }

  isObject(book: string | IBook): boolean {
    // Se comprueba si el libro ha sido poblado por el servidor: se devuelve verdadero si es un objeto
    return typeof book !== 'string';
  }
}
