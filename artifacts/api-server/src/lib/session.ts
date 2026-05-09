import { db, demoSessionTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const SESSION_ID = 1;

export async function getActiveUserId(): Promise<number> {
  const [row] = await db
    .select()
    .from(demoSessionTable)
    .where(eq(demoSessionTable.id, SESSION_ID));
  if (row) return row.activeUserId;

  const [firstUser] = await db
    .select()
    .from(usersTable)
    .orderBy(usersTable.id)
    .limit(1);
  if (!firstUser) throw new Error("No users seeded");

  await db
    .insert(demoSessionTable)
    .values({ id: SESSION_ID, activeUserId: firstUser.id });
  return firstUser.id;
}

export async function setActiveUserId(userId: number): Promise<void> {
  const [row] = await db
    .select()
    .from(demoSessionTable)
    .where(eq(demoSessionTable.id, SESSION_ID));
  if (row) {
    await db
      .update(demoSessionTable)
      .set({ activeUserId: userId })
      .where(eq(demoSessionTable.id, SESSION_ID));
  } else {
    await db
      .insert(demoSessionTable)
      .values({ id: SESSION_ID, activeUserId: userId });
  }
}
