export interface BasicDTO<T> {
  data: T;
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  }
}

export interface NativeDTO<T> {
  data: {
    attributes: T;
    id: number;
  },
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    }
  }
}
