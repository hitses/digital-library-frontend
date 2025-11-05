export interface ISearchResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
