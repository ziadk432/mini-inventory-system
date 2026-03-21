export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export class PaginatedResult<T> {
  readonly __paginated = true;

  constructor(
    public readonly data: T[],
    public readonly meta: PaginationMeta,
  ) {}

  static create<T>(
    items: T[],
    total: number,
    page: number,
    perPage: number,
  ): PaginatedResult<T> {
    return new PaginatedResult(items, {
      total,
      per_page: perPage,
      current_page: page,
      last_page: Math.max(1, Math.ceil(total / perPage)),
    });
  }
}
