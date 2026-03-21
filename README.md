# Mini Inventory System

A full-stack inventory management system with multi-warehouse support, transactional stock operations, and an audit trail.

## Tech Stack

| Layer    | Technology                                             |
| -------- | ------------------------------------------------------ |
| Backend  | NestJS 11, Drizzle ORM, PostgreSQL 16                  |
| Frontend | React 18, MUI 5, Vite, TanStack Query, react-hook-form |
| Infra    | Docker Compose (PostgreSQL)                            |

## Prerequisites

- **Node.js** >= 20
- **pnpm**
- **Docker** (for the PostgreSQL database)

## Quick Start

```bash
# 1. Start the backend (spins up PostgreSQL, installs deps, migrates DB, starts server)
npm run backend

# 2. In a second terminal, start the frontend
npm run frontend
```

| Service  | URL                     |
| -------- | ----------------------- |
| Backend  | http://localhost:3001   |
| Frontend | http://localhost:8081   |

## Available Scripts

Run these from the **project root**:

| Script              | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `npm run backend`   | Ensures Docker PostgreSQL is running, installs deps, pushes schema, starts the NestJS dev server |
| `npm run frontend`  | Installs deps and starts the Vite dev server                                |
| `npm run docker:up` | Starts the PostgreSQL container only                                        |
| `npm run docker:down` | Stops and removes the PostgreSQL container                                |

## Project Structure

```
mini-inventory-system/
├── backend/               # NestJS REST API
│   ├── src/
│   │   ├── products/      # Product CRUD
│   │   ├── warehouses/    # Warehouse CRUD
│   │   ├── inventory/     # Stock operations (add, remove, transfer)
│   │   ├── db/            # Drizzle schema & database module
│   │   └── common/        # Shared filters, interceptors, DTOs
│   ├── .env.example
│   └── package.json
├── frontend/              # React + MUI dashboard
│   ├── src/
│   │   ├── api/           # API actions & TanStack Query hooks
│   │   ├── sections/      # Feature views (product, warehouse)
│   │   ├── components/    # Reusable UI (form fields, dialogs)
│   │   └── pages/         # Page-level route components
│   └── package.json
├── docker-compose.yml     # PostgreSQL service
└── package.json           # Root scripts (npm run backend/frontend)
```

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Default                                                    | Description       |
| -------------- | ---------------------------------------------------------- | ----------------- |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/inventory_db` | PostgreSQL connection string |
| `PORT`         | `3001`                                                     | API server port   |

### Frontend

| Variable          | Default                 | Description          |
| ----------------- | ----------------------- | -------------------- |
| `VITE_SERVER_URL` | `http://localhost:3001` | Backend API base URL |

## API Overview

### Products

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/products`      | Paginated list with inventory       |
| GET    | `/products/list` | Full list (no pagination)           |
| GET    | `/products/:id`  | Single product with inventory       |
| POST   | `/products`      | Create a product (`{ name, sku }`)  |

### Warehouses

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/warehouses`      | Paginated list                      |
| GET    | `/warehouses/list` | Full list (no pagination)           |
| GET    | `/warehouses/:id`  | Warehouse detail with inventory     |
| POST   | `/warehouses`      | Create a warehouse (`{ name }`)     |

### Inventory

| Method | Endpoint              | Description                                                          |
| ------ | --------------------- | -------------------------------------------------------------------- |
| POST   | `/inventory/add`      | Add stock (`{ productId, warehouseId, quantity }`)                   |
| POST   | `/inventory/remove`   | Remove stock (`{ productId, warehouseId, quantity }`)                |
| POST   | `/inventory/transfer` | Transfer stock (`{ productId, fromWarehouseId, toWarehouseId, quantity }`) |

All responses use a `{ data, errors, message, status_code }` envelope. See `backend/README.md` for full details.

## Stopping Services

```bash
# Stop the backend dev server
# Ctrl+C in the backend terminal

# Stop PostgreSQL
npm run docker:down
```
