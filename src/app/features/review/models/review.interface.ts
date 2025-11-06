export interface IReviews {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  data: IReview[];
}

export interface IReview {
  _id: string;
  bookId: string;
  name: string;
  email: string;
  review: string;
  rating: number;
  verified: boolean;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
