export interface IReview {
  _id: string;
  bookId: string;
  name: string;
  email: string;
  review: string;
  rating: number;
  verified: boolean;
  delete: boolean;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
