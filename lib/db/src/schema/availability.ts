import { pgTable, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const availabilitySlotsTable = pgTable("availability_slots", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }).notNull(),
  isBooked: boolean("is_booked").notNull().default(false),
});

export type AvailabilitySlot = typeof availabilitySlotsTable.$inferSelect;
