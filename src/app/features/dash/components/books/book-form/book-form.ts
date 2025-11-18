import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../models/books.interface';
import { RouterLink } from '@angular/router';
import { isbnFullValidator } from '../../../../../core/validators/isbn.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'book-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.html',
})
export class BookForm {
  book = input<Book | null>(null);
  loading = input<boolean>(false);
  error = input<string | null>(null);

  submitForm = output<any>();
  resetForm = output<void>();
  cancelForm = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);

  bookForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
    isbn: ['', [Validators.required, isbnFullValidator()]],
    synopsis: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
    coverUrl: [
      '',
      [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(1000)],
    ],
  });

  ngOnInit() {
    if (this.book) this.bookForm.patchValue(this.book()!);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue(this.book()!);
    }
  }

  public onReset() {
    this.bookForm.reset();
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();

      return;
    }

    const payload = this.bookForm.value;

    this.submitForm.emit(payload);
  }
}
