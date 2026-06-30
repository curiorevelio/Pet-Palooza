---
name: drizzle-kit push interactive prompt
description: How to get past drizzle-kit push's arrow-key confirmation prompt (e.g. adding a UNIQUE constraint to a populated table) in this non-interactive environment.
---

`drizzle-kit push` shows an interactive arrow-key prompt when a change looks
potentially destructive — most commonly adding a UNIQUE constraint to a table
that already has rows ("Do you want to truncate?"). In this environment that
prompt cannot be answered: piping (`yes '' |`, `printf '\n' |`) does NOT work
(it uses raw TTY mode) and the command just times out.

**Workaround:** apply the DDL directly via `psql "$DATABASE_URL"` with a name
that matches what drizzle generates, then let `push` reconcile.
- A drizzle `.unique()` on a column generates a constraint named
  `<table>_<col>_unique` (e.g. `users_auth_id_unique`). Create it with
  `ALTER TABLE <t> ADD CONSTRAINT <t>_<col>_unique UNIQUE (<col>);`.
- Adding a UNIQUE constraint on a nullable column with all-NULL (or distinct)
  values succeeds without truncation — Postgres treats NULLs as distinct.
- After the manual DDL, keep `.unique()` in the schema and run `push` again;
  it reports "No changes detected" because DB and schema now match.

**Why:** lets you keep a real DB-level invariant instead of weakening the schema
to dodge the prompt. Adding new tables / nullable columns is non-destructive and
does NOT prompt — only the constraint did.
