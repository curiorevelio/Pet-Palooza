import { db, bookingsTable, petsTable, servicesTable, reviewsTable } from "@workspace/db";
import { inArray } from "drizzle-orm";
import { buildProviderSummaries } from "./providerSummary";

export async function hydrateBookings(rows: (typeof bookingsTable.$inferSelect)[]) {
  if (rows.length === 0) return [];
  const petIds = Array.from(new Set(rows.map((r) => r.petId)));
  const serviceIds = Array.from(new Set(rows.map((r) => r.serviceId)));
  const providerIds = Array.from(new Set(rows.map((r) => r.providerId)));
  const bookingIds = rows.map((r) => r.id);

  const [pets, services, providers, reviews] = await Promise.all([
    db.select().from(petsTable).where(inArray(petsTable.id, petIds)),
    db.select().from(servicesTable).where(inArray(servicesTable.id, serviceIds)),
    buildProviderSummaries({ ids: providerIds }),
    db.select().from(reviewsTable).where(inArray(reviewsTable.bookingId, bookingIds)),
  ]);
  const petsById = new Map(pets.map((p) => [p.id, p]));
  const servicesById = new Map(services.map((s) => [s.id, s]));
  const providersById = new Map(providers.map((p) => [p.id, p]));
  const reviewedBookingIds = new Set(reviews.map((r) => r.bookingId));

  return rows.map((r) => ({
    ...r,
    pet: petsById.get(r.petId),
    service: servicesById.get(r.serviceId),
    provider: providersById.get(r.providerId),
    hasReview: reviewedBookingIds.has(r.id),
  }));
}
