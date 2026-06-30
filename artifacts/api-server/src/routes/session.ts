import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, providersTable } from "@workspace/db";
import {
  GetSessionResponse,
  UpdateSessionBody,
  UpdateSessionResponse,
} from "@workspace/api-zod";
import { getActiveUserId } from "../lib/session";

const router: IRouter = Router();

async function buildSession(userId: number) {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  if (!user) throw new Error("Active user missing");
  const [provider] = await db
    .select()
    .from(providersTable)
    .where(eq(providersTable.userId, userId));
  return {
    user: {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      city: user.city,
      avatarUrl: user.avatarUrl,
    },
    isProvider: !!provider,
    providerId: provider?.id ?? null,
  };
}

router.get("/session", async (req, res): Promise<void> => {
  const userId = await getActiveUserId(req);
  const session = await buildSession(userId);
  res.json(GetSessionResponse.parse(session));
});

router.patch("/session", async (req, res): Promise<void> => {
  const parsed = UpdateSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId(req);
  await db
    .update(usersTable)
    .set(parsed.data)
    .where(eq(usersTable.id, userId));
  const session = await buildSession(userId);
  res.json(UpdateSessionResponse.parse(session));
});

export default router;
