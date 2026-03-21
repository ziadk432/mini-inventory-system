# Mini Inventory System — Backend

A RESTful inventory management API supporting multiple warehouses and transactional stock operations.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** NestJS 11
- **Database:** PostgreSQL 16
- **ORM:** Drizzle ORM
- **Validation:** class-validator + class-transformer

## Prerequisites

- Node.js >= 20
- pnpm
- Docker (for PostgreSQL)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start PostgreSQL via Docker
pnpm run db:up

# 3. Push the schema to the database
pnpm run db:push

# 4. Start the dev server
pnpm run start:dev
```

The API will be available at `http://localhost:3001`.

To stop PostgreSQL:

```bash
pnpm run db:down
```

## Environment Variables

Copy `.env.example` to `.env` (already provided):

| Variable       | Default                                                    |
| -------------- | ---------------------------------------------------------- |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/inventory_db` |
| `PORT`         | `3001`                                                     |

## Database Schema

| Table             | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `products`        | Product catalog (name, SKU)                    |
| `warehouses`      | Warehouse registry (name)                      |
| `inventory`       | Current stock per product-warehouse pair        |
| `stock_movements` | Audit log of every add, remove, and transfer   |

The `inventory` table has a unique constraint on `(product_id, warehouse_id)` to ensure one row per product per warehouse.

## Response Format

All endpoints return a consistent envelope:

**Normal response:**

```json
{
  "data": { ... },
  "errors": {},
  "message": "Ok",
  "status_code": 200
}
```

**Paginated response** (for list endpoints like `GET /products`, `GET /warehouses`):

```json
{
  "data": {
    "data": [ ... ],
    "meta": {
      "total": 25,
      "per_page": 10,
      "current_page": 1,
      "last_page": 3
    }
  },
  "errors": {},
  "message": "Ok",
  "status_code": 200
}
```

**Error response:**

```json
{
  "data": {},
  "errors": {
    "name": ["name should not be empty"]
  },
  "message": "Validation failed",
  "status_code": 400
}
```

## API Reference

### Products

| Method | Endpoint         | Description                                           |
| ------ | ---------------- | ----------------------------------------------------- |
| GET    | `/products`      | Paginated products with inventory (`?page=1&per_page=10`) |
| GET    | `/products/list` | All products with inventory (no pagination)           |
| GET    | `/products/:id`  | Get a single product with inventory                   |
| POST   | `/products`      | Create a product                                      |

**POST /products** body:

```json
{ "name": "Widget A", "sku": "WID-001" }
```

### Warehouses

| Method | Endpoint           | Description                                              |
| ------ | ------------------ | -------------------------------------------------------- |
| GET    | `/warehouses`      | Paginated warehouses (`?page=1&per_page=10`)             |
| GET    | `/warehouses/list` | All warehouses (no pagination)                           |
| GET    | `/warehouses/:id`  | Get warehouse detail with inventory                      |
| POST   | `/warehouses`      | Create a warehouse                                       |

**POST /warehouses** body:

```json
{ "name": "Main Warehouse" }
```

### Inventory / Stock Operations

| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| POST   | `/inventory/add`      | Add stock to a warehouse             |
| POST   | `/inventory/remove`   | Remove stock from a warehouse        |
| POST   | `/inventory/transfer` | Transfer stock between warehouses    |

**POST /inventory/add** body:

```json
{ "productId": 1, "warehouseId": 1, "quantity": 100 }
```

**POST /inventory/remove** body:

```json
{ "productId": 1, "warehouseId": 1, "quantity": 30 }
```

**POST /inventory/transfer** body:

```json
{ "productId": 1, "fromWarehouseId": 1, "toWarehouseId": 2, "quantity": 40 }
```

### Error Responses

| Status | Condition                                        |
| ------ | ------------------------------------------------ |
| 400    | Validation error, insufficient stock, same-warehouse transfer |
| 404    | Product or warehouse not found                   |
| 409    | Duplicate SKU or warehouse name                  |

## Assumptions & Design Decisions

1. **Upsert for stock additions** — When adding stock, if no inventory row exists for the product-warehouse pair, one is created automatically via PostgreSQL `ON CONFLICT DO UPDATE`. This avoids requiring a separate "initialize inventory" step.

2. **Audit trail via `stock_movements`** — Every add, remove, and transfer logs an entry in `stock_movements` with the operation type, affected warehouses, and quantity. This provides a complete history of stock changes.

3. **All stock operations are transactional** — Every stock operation (including simple adds and removes) is wrapped in a database transaction to ensure atomicity. Transfers update both source and destination warehouses within a single transaction as required.

4. **Application-level stock validation** — Insufficient-stock checks are performed by reading the current quantity inside the transaction before updating. For a high-concurrency production system, row-level locking (`SELECT ... FOR UPDATE`) or a database CHECK constraint would be preferable.

5. **Dual list endpoints** — Each resource has `GET /resource` (paginated, with `page` and `per_page` query params) and `GET /resource/list` (all records, no pagination). Products endpoints include full inventory breakdown with warehouse details.

6. **Standardized response envelope** — All responses follow a `{ data, errors, message, status_code }` structure. Paginated endpoints nest `{ data, meta }` inside the `data` field. Error responses include field-level validation errors in the `errors` object.

7. **SKU and warehouse names are unique** — SKU uniqueness is enforced at the database level. Warehouse names are also unique to prevent confusion. Duplicate attempts return 409 Conflict.

8. **Soft-delete not implemented** — Products and warehouses can only be created, not deleted or updated, keeping the scope minimal. The `ON DELETE CASCADE` foreign keys ensure referential integrity if manual deletion is needed.

9. **No authentication** — The API is open, appropriate for a local development assignment. Authentication would be added as a separate concern in production.
