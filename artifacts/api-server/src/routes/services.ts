import { Router, type IRouter } from "express";
import { and, eq } from "drizzle-orm";
import { db, servicesTable, providersTable } from "@workspace/db";
import {
  ListMyServicesResponse,
  CreateMyServiceBody,
  UpdateMyServiceParams,
  UpdateMyServiceBody,
  UpdateMyServiceResponse,
  DeleteMyServiceParams,
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

router.get("/provider/me/services", async (_req, res): Promise<void> => {
  const userId = await getActiveUserId();
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.json([]);
    return;
  }
  const services = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.providerId, providerId));
  res.json(ListMyServicesResponse.parse(services));
});

router.post("/provider/me/services", async (req, res): Promise<void> => {
  const parsed = CreateMyServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId();
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.status(400).json({ error: "Not a provider" });
    return;
  }
  const [service] = await db
    .insert(servicesTable)
    .values({ ...parsed.data, providerId })
    .returning();
  res.status(201).json(service);
});

router.patch("/provider/me/services/:id", async (req, res): Promise<void> => {
  const params = UpdateMyServiceParams.safeParse(req.params);
  const body = UpdateMyServiceBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const userId = await getActiveUserId();
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.status(404).json({ error: "Not a provider" });
    return;
  }
  const [service] = await db
    .update(servicesTable)
    .set(body.data)
    .where(and(eq(servicesTable.id, params.data.id), eq(servicesTable.providerId, providerId)))
    .returning();
  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(UpdateMyServiceResponse.parse(service));
});

router.delete("/provider/me/services/:id", async (req, res): Promise<void> => {
  const params = DeleteMyServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const userId = await getActiveUserId();
  const providerId = await getMyProviderId(userId);
  if (!providerId) {
    res.status(404).json({ error: "Not a provider" });
    return;
  }
  const [service] = await db
    .delete(servicesTable)
    .where(and(eq(servicesTable.id, params.data.id), eq(servicesTable.providerId, providerId)))
    .returning();
  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
