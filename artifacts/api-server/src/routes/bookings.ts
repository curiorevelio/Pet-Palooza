import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import {
  db,
  bookingsTable,
  servicesTable,
  availabilitySlotsTable,
  petsTable,
  providersTable,
} from "@workspace/db";
import {
  ListBookingsQueryParams,
  ListBookingsResponse,
  CreateBookingBody,
  GetBookingParams,
  GetBookingResponse,
  UpdateBookingStatusParams,
  UpdateBookingStatusBody,
  UpdateBookingStatusResponse,
  ListMyProviderBookingsQueryParams,
  ListMyProviderBookingsResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";
import { hydrateBookings } from "../lib/bookingHydrate";

const router: IRouter = Router();

router.get("/bookings", async (req, res): Promise<void> => {
  const params = ListBookingsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const conds = [eq(bookingsTable.ownerId, ownerId)];
  if (params.data.status) conds.push(eq(bookingsTable.status, params.data.status));
  const rows = await db
    .select()
    .from(bookingsTable)
    .where(and(...conds))
    .orderBy(desc(bookingsTable.startAt));
  const hydrated = await hydrateBookings(rows);
  res.json(ListBookingsResponse.parse(hydrated));
});

router.post("/bookings", async (req, res): Promise<void> => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const { petId, serviceId, slotId, notes } = parsed.data;

  const [pet] = await db
    .select()
    .from(petsTable)
    .where(and(eq(petsTable.id, petId), eq(petsTable.ownerId, ownerId)));
  if (!pet) {
    res.status(400).json({ error: "Pet not found or not yours" });
    return;
  }
  const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, serviceId));
  if (!service) {
    res.status(400).json({ error: "Service not found" });
    return;
  }
  // Atomically claim the slot: only succeeds if the slot exists, belongs to
  // this provider, and is not already booked. This prevents two concurrent
  // requests from booking the same slot.
  const [claimedSlot] = await db
    .update(availabilitySlotsTable)
    .set({ isBooked: true })
    .where(
      and(
        eq(availabilitySlotsTable.id, slotId),
        eq(availabilitySlotsTable.providerId, service.providerId),
        eq(availabilitySlotsTable.isBooked, false),
      ),
    )
    .returning();
  if (!claimedSlot) {
    res.status(400).json({ error: "Slot not available" });
    return;
  }

  const [booking] = await db
    .insert(bookingsTable)
    .values({
      ownerId,
      petId,
      providerId: service.providerId,
      serviceId,
      slotId,
      startAt: claimedSlot.startAt,
      endAt: claimedSlot.endAt,
      status: "requested",
      notes: notes ?? null,
      totalCents: service.priceCents,
    })
    .returning();

  const [hydrated] = await hydrateBookings([booking]);
  res.status(201).json(GetBookingResponse.parse(hydrated));
});

router.get("/bookings/:id", async (req, res): Promise<void> => {
  const params = GetBookingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const userId = await getActiveUserId(req);
  const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, params.data.id));
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  // owner or provider on this booking can view
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  if (booking.ownerId !== userId && provider?.id !== booking.providerId) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  const [hydrated] = await hydrateBookings([booking]);
  res.json(GetBookingResponse.parse(hydrated));
});

router.patch("/bookings/:id", async (req, res): Promise<void> => {
  const params = UpdateBookingStatusParams.safeParse(req.params);
  const body = UpdateBookingStatusBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const userId = await getActiveUserId(req);
  const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, params.data.id));
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  const isOwner = booking.ownerId === userId;
  const isProvider = provider?.id === booking.providerId;
  if (!isOwner && !isProvider) {
    res.status(403).json({ error: "Not allowed" });
    return;
  }
  const next = body.data.status;
  // owner can cancel; provider can confirm/complete/cancel
  if (isOwner && !isProvider && next !== "cancelled") {
    res.status(403).json({ error: "Owners can only cancel" });
    return;
  }
  const [updated] = await db
    .update(bookingsTable)
    .set({ status: next })
    .where(eq(bookingsTable.id, booking.id))
    .returning();

  if (next === "cancelled" && booking.slotId) {
    await db
      .update(availabilitySlotsTable)
      .set({ isBooked: false })
      .where(eq(availabilitySlotsTable.id, booking.slotId));
  }

  const [hydrated] = await hydrateBookings([updated]);
  res.json(UpdateBookingStatusResponse.parse(hydrated));
});

router.get("/provider/me/bookings", async (req, res): Promise<void> => {
  const params = ListMyProviderBookingsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const userId = await getActiveUserId(req);
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  if (!provider) {
    res.json([]);
    return;
  }
  const conds = [eq(bookingsTable.providerId, provider.id)];
  if (params.data.status) conds.push(eq(bookingsTable.status, params.data.status));
  const rows = await db
    .select()
    .from(bookingsTable)
    .where(and(...conds))
    .orderBy(desc(bookingsTable.startAt));
  const hydrated = await hydrateBookings(rows);
  res.json(ListMyProviderBookingsResponse.parse(hydrated));
});

export default router;
