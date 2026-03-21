# Mini Inventory System — Frontend

A React frontend for the Mini Inventory Management System, built on the Minimals v6 starter.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **UI:** MUI 5 (Material UI)
- **Build:** Vite
- **Forms:** react-hook-form + zod
- **Server State:** TanStack Query (React Query)
- **HTTP:** axios
- **Notifications:** sonner

## Prerequisites

- Node.js >= 20
- pnpm
- Backend running on `http://localhost:3001` (see `backend/README.md`)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm run dev
```

The app will be available at `http://localhost:8081`.

## Environment Variables

The `.env` file configures the backend connection:

| Variable          | Default                  | Description         |
| ----------------- | ------------------------ | ------------------- |
| `VITE_SERVER_URL` | `http://localhost:3001`  | Backend API base URL |

## API Shape (Backend Contract)

The frontend expects the backend to expose:

### Products

| Method | Endpoint          | Description                          |
| ------ | ----------------- | ------------------------------------ |
| GET    | `/products`       | Paginated products with inventory    |
| GET    | `/products/list`  | All products (no pagination)         |
| GET    | `/products/:id`   | Single product with inventory detail |
| POST   | `/products`       | Create a product (`{ name, sku }`)   |

### Warehouses

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/warehouses`       | Paginated warehouses       |
| GET    | `/warehouses/list`  | All warehouses             |
| POST   | `/warehouses`       | Create (`{ name }`)       |

### Inventory

| Method | Endpoint              | Description                                                       |
| ------ | --------------------- | ----------------------------------------------------------------- |
| POST   | `/inventory/add`      | Add stock (`{ productId, warehouseId, quantity }`)                |
| POST   | `/inventory/remove`   | Remove stock (`{ productId, warehouseId, quantity }`)             |
| POST   | `/inventory/transfer` | Transfer (`{ productId, fromWarehouseId, toWarehouseId, quantity }`) |

All responses follow a `{ data, errors, message, status_code }` envelope. Paginated endpoints nest `{ data, meta }` inside `data`.

## UI/UX Design Decisions

1. **Expandable product rows** — Each product row in the list can be expanded to reveal per-warehouse inventory. This keeps the UX lightweight: no separate detail page needed.

2. **Dialog-based stock operations** — Add Stock, Remove Stock, and Transfer Stock are triggered from action buttons within the expanded inventory row. Each opens a dialog with form validation.

3. **No authentication** — The app loads directly into the dashboard with `auth.skip: true`. No login screen, no tokens, no guards.

4. **TanStack Query for server state** — Provides automatic caching, background refetching, and mutation-driven cache invalidation. After any stock operation, product queries are automatically invalidated so the table refreshes.

5. **sonner for toast notifications** — Lightweight toast library. Success/error feedback appears on form submissions and stock operations.

## Project Structure

```
src/
├── api/
│   ├── actions/          # Raw API call functions (axios)
│   └── hooks/            # TanStack Query hooks wrapping actions
├── components/
│   ├── hook-form/        # Form field components (Field.Text, Field.Select)
│   └── inventory/        # Stock operation dialogs
├── constants/            # API endpoints, query keys
├── pages/dashboard/      # Thin page wrappers (Helmet + section view)
├── sections/
│   ├── product/          # Product list, create, table row, inventory details
│   └── warehouse/        # Warehouse list, create
├── types/                # TypeScript interfaces
└── utils/                # axios instance, getServerError helper
```
