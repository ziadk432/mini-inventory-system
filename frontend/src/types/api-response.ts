// ----------------------------------------------------------------------
// API envelope
// ----------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  errors: Record<string, string[]>;
  message: string;
  status_code: number;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}
