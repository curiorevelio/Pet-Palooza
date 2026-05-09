import { Router, type IRouter } from "express";
import { and, eq } from "drizzle-orm";
import { db, providersTable, servicesTable, reviewsTable, usersTable } from "@workspace/db";
import {
  ListProvidersQueryParams,
  ListProvidersResponse,
  GetProviderParams,
  GetProviderResponse,
  GetMyProviderResponse,
  UpsertMyProviderBody,
  UpsertMyProviderResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";
import { buildProviderSummaries } from "../lib/providerSummary";

const router: IRouter = Router();

router.get("/providers", async (req, res): Promise<void> => {
  const params = ListProvidersQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const summaries = await buildProviderSummaries(params.data);
  res.json(ListProvidersResponse.parse(summaries));
});

router.get("/providers/:id", async (req, res): Promise<void> => {
  const params = GetProviderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.id, params.data.id));
  if (!provider) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }
  const services = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.providerId, provider.id));
  const reviewRows = await db
    .select({
      r: reviewsTable,
      ownerName: usersTable.displayName,
      ownerAvatarUrl: usersTable.avatarUrl,
    })
    .from(reviewsTable)
    .innerJoin(usersTable, eq(usersTable.id, reviewsTable.ownerId))
    .where(eq(reviewsTable.providerId, provider.id));

  // Need pet name + service type per review — fetch via bookings join
  const { bookingsTable, petsTable } = await import("@workspace/db");
  const bookingIds = reviewRows.map((row) => row.r.bookingId);
  const bookings = bookingIds.length
    ? await db
        .select({
          id: bookingsTable.id,
          petId: bookingsTable.petId,
          serviceId: bookingsTable.serviceId,
        })
        .from(bookingsTable)
        .where(eq(bookingsTable.providerId, provider.id))
    : [];
  const bookingsById = new Map(bookings.map((b) => [b.id, b]));
  const petIds = Array.from(new Set(bookings.map((b) => b.petId)));
  const pets = petIds.length
    ? await db.select().from(petsTable)
    : [];
  const petsById = new Map(pets.map((p) => [p.id, p]));
  const servicesById = new Map(services.map((s) => [s.id, s]));

  const reviews = reviewRows.map((row) => {
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

  const ratingAverage =
    reviews.length === 0
      ? 0
      : Math.round(
          (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10,
        ) / 10;

  res.json(
    GetProviderResponse.parse({
      provider,
      services,
      reviews,
      ratingAverage,
      reviewCount: reviews.length,
    }),
  );
});

router.get("/provider/me", async (_req, res): Promise<void> => {
  const userId = await getActiveUserId();
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  res.json(
    GetMyProviderResponse.parse({
      isProvider: !!provider,
      provider: provider ?? null,
    }),
  );
});

router.put("/provider/me", async (req, res): Promise<void> => {
  const parsed = UpsertMyProviderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId();
  const [existing] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  let provider;
  if (existing) {
    [provider] = await db
      .update(providersTable)
      .set(parsed.data)
      .where(eq(providersTable.userId, userId))
      .returning();
  } else {
    [provider] = await db
      .insert(providersTable)
      .values({ ...parsed.data, userId })
      .returning();
  }
  res.json(UpsertMyProviderResponse.parse(provider));
});

export default router;
