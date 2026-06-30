import { Router, type IRouter } from "express";
import { and, asc, eq, gte } from "drizzle-orm";
import { db, availabilitySlotsTable, providersTable } from "@workspace/db";
import {
  ListMyAvailabilityResponse,
  CreateMyAvailabilityBody,
  DeleteMyAvailabilityParams,
  ListProviderAvailabilityParams,
  ListProviderAvailabilityResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";

const router: IRouter = Router();

async function getMyProviderId(userId: number): Promise<number | null> {
  const [p] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  return p?.id ?? null;
}

router.get("/provider/me/availability", async (req, res): Promise<void> => {
  const userId = await getActiveUserId(req);
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.json([]);
    return;
  }
  const slots = await db
    .select()
    .from(availabilitySlotsTable)
    .where(eq(availabilitySlotsTable.providerId, providerId))
    .orderBy(asc(availabilitySlotsTable.startAt));
  res.json(ListMyAvailabilityResponse.parse(slots));
});

router.post("/provider/me/availability", async (req, res): Promise<void> => {
  const parsed = CreateMyAvailabilityBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId(req);
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.status(400).json({ error: "Not a provider" });
    return;
  }
  const [slot] = await db
    .insert(availabilitySlotsTable)
    .values({
      providerId,
      startAt: new Date(parsed.data.startAt),
      endAt: new Date(parsed.data.endAt),
      isBooked: false,
    })
    .returning();
  res.status(201).json(slot);
});

router.delete("/provider/me/availability/:id", async (req, res): Promise<void> => {
  const params = DeleteMyAvailabilityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const userId = await getActiveUserId(req);
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.status(404).json({ error: "Not a provider" });
    return;
  }
  const [slot] = await db
    .delete(availabilitySlotsTable)
    .where(
      and(
        eq(availabilitySlotsTable.id, params.data.id),
        eq(availabilitySlotsTable.providerId, providerId),
      ),
    )
    .returning();
  if (!slot) {
    res.status(404).json({ error: "Slot not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/providers/:id/availability", async (req, res): Promise<void> => {
  const params = ListProviderAvailabilityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const slots = await db
    .select()
    .from(availabilitySlotsTable)
    .where(
      and(
        eq(availabilitySlotsTable.providerId, params.data.id),
        eq(availabilitySlotsTable.isBooked, false),
        gte(availabilitySlotsTable.startAt, new Date()),
      ),
    )
    .orderBy(asc(availabilitySlotsTable.startAt));
  res.json(ListProviderAvailabilityResponse.parse(slots));
});

export default router;
