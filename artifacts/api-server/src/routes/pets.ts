import { Router, type IRouter } from "express";
import { and, eq } from "drizzle-orm";
import { db, petsTable } from "@workspace/db";
import {
  ListPetsResponse,
  CreatePetBody,
  GetPetParams,
  GetPetResponse,
  UpdatePetParams,
  UpdatePetBody,
  UpdatePetResponse,
  DeletePetParams,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";

const router: IRouter = Router();

router.get("/pets", async (req, res): Promise<void> => {
  const ownerId = await getActiveUserId(req);
  const pets = await db
    .select()
    .from(petsTable)
    .where(eq(petsTable.ownerId, ownerId))
    .orderBy(petsTable.createdAt);
  res.json(ListPetsResponse.parse(pets));
});

router.post("/pets", async (req, res): Promise<void> => {
  const parsed = CreatePetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const [pet] = await db
    .insert(petsTable)
    .values({ ...parsed.data, ownerId })
    .returning();
  res.status(201).json(GetPetResponse.parse(pet));
});

router.get("/pets/:id", async (req, res): Promise<void> => {
  const params = GetPetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const [pet] = await db
    .select()
    .from(petsTable)
    .where(and(eq(petsTable.id, params.data.id), eq(petsTable.ownerId, ownerId)));
  if (!pet) {
    res.status(404).json({ error: "Pet not found" });
    return;
  }
  res.json(GetPetResponse.parse(pet));
});

router.patch("/pets/:id", async (req, res): Promise<void> => {
  const params = UpdatePetParams.safeParse(req.params);
  const body = UpdatePetBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const [pet] = await db
    .update(petsTable)
    .set(body.data)
    .where(and(eq(petsTable.id, params.data.id), eq(petsTable.ownerId, ownerId)))
    .returning();
  if (!pet) {
    res.status(404).json({ error: "Pet not found" });
    return;
  }
  res.json(UpdatePetResponse.parse(pet));
});

router.delete("/pets/:id", async (req, res): Promise<void> => {
  const params = DeletePetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const ownerId = await getActiveUserId(req);
  const [pet] = await db
    .delete(petsTable)
    .where(and(eq(petsTable.id, params.data.id), eq(petsTable.ownerId, ownerId)))
    .returning();
  if (!pet) {
    res.status(404).json({ error: "Pet not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
