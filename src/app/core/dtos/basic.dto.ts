export interface BasicDTO<T> {
  data: T;
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  }
}
