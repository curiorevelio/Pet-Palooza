import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, reviewsTable, bookingsTable, usersTable, petsTable, servicesTable } from "@workspace/db";
import {
  CreateReviewBody,
  ListProviderReviewsParams,
  ListProviderReviewsResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";

const router: IRouter = Router();

router.post("/reviews", async (req, res): Promise<void> => {
  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId();
  const [booking] = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.id, parsed.data.bookingId));
  if (!booking || booking.ownerId !== userId) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  if (booking.status !== "completed") {
    res.status(400).json({ error: "Booking not completed" });
    return;
  }
  const [existing] = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.bookingId, booking.id));
  if (existing) {
    res.status(400).json({ error: "Already reviewed" });
    return;
  }
  const [review] = await db
    .insert(reviewsTable)
    .values({
      bookingId: booking.id,
      providerId: booking.providerId,
      ownerId: userId,
      rating: parsed.data.rating,
      body: parsed.data.body ?? null,
    })
    .returning();

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  const [pet] = await db.select().from(petsTable).where(eq(petsTable.id, booking.petId));
  const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, booking.serviceId));
  res.status(201).json({
    id: review.id,
    bookingId: review.bookingId,
    providerId: review.providerId,
    ownerId: review.ownerId,
    ownerName: user?.displayName ?? "",
    ownerAvatarUrl: user?.avatarUrl ?? null,
    petName: pet?.name ?? null,
    serviceType: service?.serviceType ?? "walking",
    rating: review.rating,
    body: review.body,
    createdAt: review.createdAt,
  });
});

router.get("/providers/:id/reviews", async (req, res): Promise<void> => {
  const params = ListProviderReviewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const rows = await db
    .select({
      r: reviewsTable,
      ownerName: usersTable.displayName,
      ownerAvatarUrl: usersTable.avatarUrl,
    })
    .from(reviewsTable)
    .innerJoin(usersTable, eq(usersTable.id, reviewsTable.ownerId))
    .where(eq(reviewsTable.providerId, params.data.id));

  const bookingIds = rows.map((row) => row.r.bookingId);
  const bookings = bookingIds.length
    ? await db.select().from(bookingsTable).where(eq(bookingsTable.providerId, params.data.id))
    : [];
  const bookingsById = new Map(bookings.map((b) => [b.id, b]));
  const petIds = Array.from(new Set(bookings.map((b) => b.petId)));
  const serviceIds = Array.from(new Set(bookings.map((b) => b.serviceId)));
  const pets = petIds.length ? await db.select().from(petsTable) : [];
  const services = serviceIds.length ? await db.select().from(servicesTable) : [];
  const petsById = new Map(pets.map((p) => [p.id, p]));
  const servicesById = new Map(services.map((s) => [s.id, s]));

  const reviews = rows.map((row) => {
    const b = bookingsById.get(row.r.bookingId);
    const pet = b ? petsById.get(b.petId) : undefined;
    const svc = b ? servicesById.get(b.serviceId) : undefined;
    return {
      id: row.r.id,
      bookingId: row.r.bookingId,
      providerId: row.r.providerId,
      ownerId: row.r.ownerId,
      ownerName: row.ownerName,
      ownerAvatarUrl: row.ownerAvatarUrl,
      petName: pet?.name ?? null,
      serviceType: svc?.serviceType ?? "walking",
      rating: row.r.rating,
      body: row.r.body,
      createdAt: row.r.createdAt,
    };
  });
  res.json(ListProviderReviewsResponse.parse(reviews));
});

export default router;
