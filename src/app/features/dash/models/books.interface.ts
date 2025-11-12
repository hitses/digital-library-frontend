export interface BooksResponse {
  data: Book[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  synopsis: string;
  coverUrl: string;
  delete: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  featured: boolean;
  featuredAt?: Date;
  averageRating: number;
  totalReviews: number;
}
