import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const petsTable = pgTable("pets", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull(),
  name: text("name").notNull(),
  species: text("species").notNull(), // dog | cat | other
  breed: text("breed"),
  ageYears: integer("age_years"),
  weightLbs: integer("weight_lbs"),
  photoUrl: text("photo_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Pet = typeof petsTable.$inferSelect;
