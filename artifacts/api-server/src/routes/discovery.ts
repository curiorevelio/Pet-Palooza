import { Router, type IRouter } from "express";
import { and, asc, desc, eq, gte, inArray, ne, sql } from "drizzle-orm";
import {
  db,
  providersTable,
  servicesTable,
  bookingsTable,
  reviewsTable,
  petsTable,
  usersTable,
} from "@workspace/db";
import {
  GetHomeDiscoveryResponse,
  GetOwnerDashboardResponse,
  GetProviderDashboardResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";
import { buildProviderSummaries, completedBookingCount } from "../lib/providerSummary";

const router: IRouter = Router();

router.get("/discovery/home", async (_req, res): Promise<void> => {
  const summaries = await buildProviderSummaries();
  const sortedByRating = [...summaries].sort((a, b) => {
    if (b.ratingAverage !== a.ratingAverage) return b.ratingAverage - a.ratingAverage;
    return b.reviewCount - a.reviewCount;
  });
  const featured = [...summaries]
    .sort((a, b) => Number(b.verified) - Number(a.verified) || b.ratingAverage - a.ratingAverage)
    .slice(0, 6);
  const topRated = sortedByRating.slice(0, 4);

  const types = ["walking", "sitting", "grooming", "washing", "training"] as const;
  const serviceCategoryCounts = types.map((t) => {
    const providers = summaries.filter((s) => s.serviceTypes.includes(t));
    const startingPriceCents = providers.reduce<number | null>((min, p) => {
      if (p.startingPriceCents == null) return min;
      if (min == null) return p.startingPriceCents;
      return Math.min(min, p.startingPriceCents);
    }, null);
    return {
      serviceType: t,
      providerCount: providers.length,
      startingPriceCents,
    };
  });

  const totalCompletedBookings = await completedBookingCount();

  res.json(
    GetHomeDiscoveryResponse.parse({
      featured,
      topRated,
      serviceCategoryCounts,
      totalProviders: summaries.length,
      totalCompletedBookings,
    }),
  );
});

router.get("/discovery/owner-dashboard", async (_req, res): Promise<void> => {
  const ownerId = await getActiveUserId();
  const [pets, allBookings] = await Promise.all([
    db.select().from(petsTable).where(eq(petsTable.ownerId, ownerId)),
    db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.ownerId, ownerId))
      .orderBy(desc(bookingsTable.startAt)),
  ]);
  const upcoming = allBookings.filter(
    (b) => (b.status === "requested" || b.status === "confirmed") && b.startAt > new Date(),
  );
  const completed = allBookings.filter((b) => b.status === "completed");
  const totalSpentCents = completed.reduce((s, b) => s + b.totalCents, 0);

  const { hydrateBookings } = await import("../lib/bookingHydrate");
  const upcomingHydrated = await hydrateBookings(upcoming.slice(0, 5));

  // Recommended providers: top rated that owner hasn't booked
  const summaries = await buildProviderSummaries();
  const bookedIds = new Set(allBookings.map((b) => b.providerId));
  const recommended = summaries
    .filter((s) => !bookedIds.has(s.id))
    .sort((a, b) => b.ratingAverage - a.ratingAverage || b.reviewCount - a.reviewCount)
    .slice(0, 3);

  res.json(
    GetOwnerDashboardResponse.parse({
      petCount: pets.length,
      upcomingBookingCount: upcoming.length,
      completedBookingCount: completed.length,
      totalSpentCents,
      upcomingBookings: upcomingHydrated,
      pets,
      recommendedProviders: recommended,
    }),
  );
});

router.get("/discovery/provider-dashboard", async (_req, res): Promise<void> => {
  const userId = await getActiveUserId();
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  if (!provider) {
    res.json(
      GetProviderDashboardResponse.parse({
        pendingCount: 0,
        upcomingCount: 0,
        completedCount: 0,
        totalEarningsCents: 0,
        ratingAverage: 0,
        reviewCount: 0,
        upcomingBookings: [],
        recentReviews: [],
      }),
    );
    return;
  }

  const allBookings = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.providerId, provider.id))
    .orderBy(asc(bookingsTable.startAt));
  const pending = allBookings.filter((b) => b.status === "requested");
  const upcoming = allBookings.filter(
    (b) => (b.status === "requested" || b.status === "confirmed") && b.startAt > new Date(),
  );
  const completed = allBookings.filter((b) => b.status === "completed");
  const totalEarnings = completed.reduce((s, b) => s + b.totalCents, 0);

  const reviewRows = await db
    .select({
      r: reviewsTable,
      ownerName: usersTable.displayName,
      ownerAvatarUrl: usersTable.avatarUrl,
    })
    .from(reviewsTable)
    .innerJoin(usersTable, eq(usersTable.id, reviewsTable.ownerId))
    .where(eq(reviewsTable.providerId, provider.id))
    .orderBy(desc(reviewsTable.createdAt))
    .limit(5);

  const bookingIds = reviewRows.map((row) => row.r.bookingId);
  const reviewBookings = bookingIds.length
    ? allBookings.filter((b) => bookingIds.includes(b.id))
    : [];
  const petIds = Array.from(new Set(reviewBookings.map((b) => b.petId)));
  const serviceIds = Array.from(new Set(reviewBookings.map((b) => b.serviceId)));
  const pets = petIds.length
    ? await db.select().from(petsTable).where(inArray(petsTable.id, petIds))
    : [];
  const services = serviceIds.length
    ? await db.select().from(servicesTable).where(inArray(servicesTable.id, serviceIds))
    : [];
  const petsById = new Map(pets.map((p) => [p.id, p]));
  const servicesById = new Map(services.map((s) => [s.id, s]));
  const bookingsById = new Map(reviewBookings.map((b) => [b.id, b]));

  const recentReviews = reviewRows.map((row) => {
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

  const allReviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.providerId, provider.id));
  const ratingAverage = allReviews.length
    ? Math.round(
        (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length) * 10,
      ) / 10
    : 0;

  const { hydrateBookings } = await import("../lib/bookingHydrate");
  const upcomingHydrated = await hydrateBookings(upcoming.slice(0, 5));

  res.json(
    GetProviderDashboardResponse.parse({
      pendingCount: pending.length,
      upcomingCount: upcoming.length,
      completedCount: completed.length,
      totalEarningsCents: totalEarnings,
      ratingAverage,
      reviewCount: allReviews.length,
      upcomingBookings: upcomingHydrated,
      recentReviews,
    }),
  );
});

export default router;
