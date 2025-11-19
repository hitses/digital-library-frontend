export interface AdminDto {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  mustChangePassword: boolean;
  delete: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
