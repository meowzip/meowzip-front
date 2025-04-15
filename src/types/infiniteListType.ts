export interface PageResponse<T> {
  status: string;
  total: number;
  hasNext: boolean;
  items: T[];
}

export interface InfiniteQueryResponse<T> {
  pages: PageResponse<T>[];
  pageParams: number[];
}
