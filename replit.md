# NextGear Rentals

A production-grade car/vehicle rental landing page and booking system for NextGear Rentals.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port from env)
- `pnpm --filter @workspace/web run dev` — run the React frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui
- API: Express 5 (Node.js)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec → React Query hooks + Zod schemas)
- Build: esbuild (CJS bundle for server)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/bookings.ts` — Drizzle ORM schema for the bookings table
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas for server validation (do not edit)
- `artifacts/api-server/src/routes/bookings.ts` — booking CRUD + stats routes
- `artifacts/web/src/` — React frontend

## Architecture decisions

- OpenAPI-first: all API contracts live in `lib/api-spec/openapi.yaml`; client hooks and Zod schemas are generated from it via Orval — never hand-write types that codegen produces.
- Drizzle ORM is the single source of truth for the DB schema; `pnpm --filter @workspace/db run push` syncs it to the dev database.
- The `/api/bookings/stats/summary` endpoint is registered before `/api/bookings/:id` in Express to avoid param route shadowing.
- `SESSION_SECRET` env var is pre-configured for future auth integration.

## Product

- Landing page showcasing NextGear Rentals' vehicle fleet
- Booking form: full name, phone, vehicle selection, rental days, date
- Backend persists bookings to PostgreSQL
- Admin-friendly stats: total bookings, per-vehicle breakdown, average rental days

## Database schema

```
bookings
  id              serial PK
  full_name       text NOT NULL
  phone_number    text NOT NULL
  selected_vehicle text NOT NULL
  rental_days     integer NOT NULL
  booking_date    timestamp NOT NULL (default: now())
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/healthz | Health check |
| GET | /api/bookings | List all bookings |
| POST | /api/bookings | Create a booking |
| GET | /api/bookings/:id | Get a booking |
| DELETE | /api/bookings/:id | Delete a booking |
| GET | /api/bookings/stats/summary | Aggregated stats |

## User preferences

- Build in TypeScript throughout — no plain JS files in src/
- Follow OpenAPI-first approach for all new endpoints
- Use drizzle-zod for DB insert schemas; do not write manual Zod schemas for DB types

## Gotchas

- Always run codegen after editing `lib/api-spec/openapi.yaml`
- Always run `pnpm --filter @workspace/db run push` after editing the Drizzle schema
- `/api/bookings/stats/summary` must be defined before `/api/bookings/:id` in the Express router
- Do not read generated files (`lib/api-client-react/src/generated/`, `lib/api-zod/src/generated/`) — they are large and auto-replaced by codegen

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
