import { db, providersTable, servicesTable, reviewsTable, bookingsTable } from "@workspace/db";
import { eq, inArray, and, ilike, or, sql } from "drizzle-orm";

export interface ProviderSummary {
  id: number;
  businessName: string;
  city: string;
  photoUrl: string | null;
  coverPhotoUrl: string | null;
  bio: string | null;
  verified: boolean;
  yearsExperience: number | null;
  serviceTypes: string[];
  ratingAverage: number;
  reviewCount: number;
  startingPriceCents: number | null;
}

export async function buildProviderSummaries(filter?: {
  serviceType?: string;
  city?: string;
  search?: string;
  ids?: number[];
}): Promise<ProviderSummary[]> {
  const conditions = [];
  if (filter?.city) conditions.push(ilike(providersTable.city, `%${filter.city}%`));
  if (filter?.search) {
    conditions.push(
      or(
        ilike(providersTable.businessName, `%${filter.search}%`),
        ilike(providersTable.bio, `%${filter.search}%`),
        ilike(providersTable.city, `%${filter.search}%`),
      )!,
    );
  }
  if (filter?.ids && filter.ids.length > 0) {
    conditions.push(inArray(providersTable.id, filter.ids));
  }

  let providers = await db
    .select()
    .from(providersTable)
    .where(conditions.length ? and(...conditions) : undefined);

  if (providers.length === 0) return [];

  const providerIds = providers.map((p) => p.id);

  const services = await db
    .select()
    .from(servicesTable)
    .where(inArray(servicesTable.providerId, providerIds));

  // Filter by serviceType post-hoc so we keep providers that offer that type
  if (filter?.serviceType) {
    const matching = new Set(
      services
        .filter((s) => s.serviceType === filter.serviceType)
        .map((s) => s.providerId),
    );
    providers = providers.filter((p) => matching.has(p.id));
    if (providers.length === 0) return [];
  }

  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(inArray(reviewsTable.providerId, providers.map((p) => p.id)));

  const byProvider = new Map<number, ProviderSummary>();
  for (const p of providers) {
    byProvider.set(p.id, {
      id: p.id,
      businessName: p.businessName,
      city: p.city,
      photoUrl: p.photoUrl,
      coverPhotoUrl: p.coverPhotoUrl,
      bio: p.bio,
      verified: p.verified,
      yearsExperience: p.yearsExperience,
      serviceTypes: [],
      ratingAverage: 0,
      reviewCount: 0,
      startingPriceCents: null,
    });
  }
  for (const s of services) {
    const sum = byProvider.get(s.providerId);
    if (!sum) continue;
    if (!sum.serviceTypes.includes(s.serviceType)) sum.serviceTypes.push(s.serviceType);
    if (sum.startingPriceCents == null || s.priceCents < sum.startingPriceCents) {
      sum.startingPriceCents = s.priceCents;
    }
  }
  const ratings = new Map<number, { sum: number; count: number }>();
  for (const r of reviews) {
    const cur = ratings.get(r.providerId) ?? { sum: 0, count: 0 };
    cur.sum += r.rating;
    cur.count += 1;
    ratings.set(r.providerId, cur);
  }
  for (const [pid, r] of ratings) {
    const sum = byProvider.get(pid);
    if (!sum) continue;
    sum.ratingAverage = r.count ? Math.round((r.sum / r.count) * 10) / 10 : 0;
    sum.reviewCount = r.count;
  }
  return Array.from(byProvider.values());
}

export async function completedBookingCount(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bookingsTable)
    .where(eq(bookingsTable.status, "completed"));
  return result[0]?.count ?? 0;
}
