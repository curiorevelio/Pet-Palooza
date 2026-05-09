import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, providersTable } from "@workspace/db";
import {
  GetSessionResponse,
  UpdateSessionBody,
  UpdateSessionResponse,
  SwitchUserBody,
  SwitchUserResponse,
  ListUsersResponse,
} from "@workspace/api-zod";
import { getActiveUserId, setActiveUserId } from "../lib/session";

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

router.get("/session", async (_req, res): Promise<void> => {
  const userId = await getActiveUserId();
  const session = await buildSession(userId);
  res.json(GetSessionResponse.parse(session));
});

router.patch("/session", async (req, res): Promise<void> => {
  const parsed = UpdateSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = await getActiveUserId();
  await db
    .update(usersTable)
    .set(parsed.data)
    .where(eq(usersTable.id, userId));
  const session = await buildSession(userId);
  res.json(UpdateSessionResponse.parse(session));
});

router.post("/session/switch", async (req, res): Promise<void> => {
  const parsed = SwitchUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parsed.data.userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  await setActiveUserId(user.id);
  const session = await buildSession(user.id);
  res.json(SwitchUserResponse.parse(session));
});

router.get("/users", async (_req, res): Promise<void> => {
  const users = await db.select().from(usersTable).orderBy(usersTable.id);
  res.json(
    ListUsersResponse.parse(
      users.map((u) => ({
        id: u.id,
        displayName: u.displayName,
        email: u.email,
        city: u.city,
        avatarUrl: u.avatarUrl,
      })),
    ),
  );
});

export default router;
