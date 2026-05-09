import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const providersTable = pgTable("providers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  businessName: text("business_name").notNull(),
  bio: text("bio"),
  city: text("city").notNull(),
  zipCode: text("zip_code"),
  photoUrl: text("photo_url"),
  coverPhotoUrl: text("cover_photo_url"),
  yearsExperience: integer("years_experience"),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Provider = typeof providersTable.$inferSelect;
