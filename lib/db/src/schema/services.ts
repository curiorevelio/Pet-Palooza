import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  serviceType: text("service_type").notNull(), // walking|sitting|grooming|washing|training
  title: text("title"),
  description: text("description"),
  priceCents: integer("price_cents").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export type Service = typeof servicesTable.$inferSelect;
