import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { IBook } from '../../models/book.interface';
import { FilledStar } from '../../../../core/icons/filled-star/filled-star';
import { Star } from '../../../../core/icons/star/star';

@Component({
  selector: 'book-card-component',
  imports: [FilledStar, Star],
  templateUrl: './book-card.html',
  styles: ``,
})
export class BookCard implements OnInit {
  book = input.required<IBook>();
  filledStars: WritableSignal<number[]> = signal<number[]>([]);
  stars: WritableSignal<number[]> = signal<number[]>([]);

  ngOnInit() {
    const rating = Math.round(this.book().averageRating || 0);

    this.filledStars.set(Array(rating).fill(0));
    this.stars.set(Array(5 - rating).fill(0));
  }
}
