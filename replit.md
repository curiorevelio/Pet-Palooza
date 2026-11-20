# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

### Local booking demo

Set `PAWHUB_DEMO_MODE=true` when starting the API with `NODE_ENV=development`
to skip Replit sign-in and use the seeded Emma Hayes account. All visitors
share that account and can change its data; use only an isolated development
database with sample data. The UI labels this mode and hides logout.
The flag has no effect in production or when `NODE_ENV` is unset. Leave it
unset to use normal Replit authentication. No frontend flag is required.

### Bengaluru provider map

On **Find Care**, select **Show Bengaluru map** to see matching providers at
their approximate service-area centres. Map loading is opt-in. Each mapped
provider also has a Google Maps locality link that works without a key.

Supply `VITE_GOOGLE_MAPS_API_KEY` to the booking frontend at dev-server startup
or build time. Vite exposes this browser key to visitors: restrict it to the
Maps JavaScript API and your approved website referrers, enable billing, and
do not use a server key. Restart Vite after changing it.

New demo databases seed five Bengaluru providers. For an existing **demo**
database, run `psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/relocate-demo-providers.sql`
once. It updates only matching seeded accounts at their original sample locations.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
