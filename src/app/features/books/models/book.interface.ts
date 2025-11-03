import { IReview } from '../../review/models/review.interface';

export interface IBook {
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
  averageRating: number;
  totalReviews: number;
  featured: boolean;
  featuredAt: Date;
  reviews: IReview[];
}
