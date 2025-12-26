import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IReview, IReviews } from '../../review/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class DashReviewsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAllReviews(page: number = 1, limit: number = 10, verified?: boolean): Observable<IReviews> {
    // Se inicializan los parámetros de búsqueda
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    // Se añade el filtro de verificación solo si no es undefined
    if (verified !== undefined) {
      params = params.set('verified', verified.toString());
    }

    // Se realiza la petición: el servidor debe recibir ?verified=false o nada
    return this.http.get<IReviews>(`${this.baseUrl}/review`, { params });
  }

  getReviewsByBook(
    bookId: string,
    verified: boolean,
    page: number = 1,
    limit: number = 5,
  ): Observable<IReviews> {
    return this.http.get<IReviews>(
      `${this.baseUrl}/review/book/${bookId}?page=${page}&limit=${limit}&verified=${verified}`,
    );
  }

  verifyReview(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/review/${id}`, {
      verified: true,
    });
  }

  updateReview(id: string, data: Partial<IReview>): Observable<IReview> {
    // Se actualizan los datos de la reseña: se devuelve la reseña modificada
    return this.http.patch<IReview>(`${this.baseUrl}/review/${id}`, data);
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/review/${id}`);
  }
}
