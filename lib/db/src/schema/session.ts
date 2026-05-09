import { pgTable, integer, text } from "drizzle-orm/pg-core";

// Single-row table that tracks the active demo user. Only id=1 is used.
export const demoSessionTable = pgTable("demo_session", {
  id: integer("id").primaryKey(),
  activeUserId: integer("active_user_id").notNull(),
  // unused, kept simple
  note: text("note"),
});
