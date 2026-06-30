import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { Request } from "express";

/**
 * Resolve the application's domain user id for the currently authenticated
 * Replit Auth identity. The OIDC identity (req.user) is linked to a row in the
 * domain `users` table via its `authId` column:
 *   1. If a domain user is already linked, return it.
 *   2. Otherwise, claim an existing seeded user with the same email.
 *   3. Otherwise, create a new domain user from the OIDC profile.
 */
export async function getActiveUserId(req: Request): Promise<number> {
  const authUser = req.user;
  if (!authUser) throw new Error("Not authenticated");

  const [linked] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.authId, authUser.id));
  if (linked) return linked.id;

  if (authUser.email) {
    const [byEmail] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, authUser.email));
    if (byEmail) {
      await db
        .update(usersTable)
        .set({ authId: authUser.id })
        .where(eq(usersTable.id, byEmail.id));
      return byEmail.id;
    }
  }

  const displayName =
    [authUser.firstName, authUser.lastName].filter(Boolean).join(" ").trim() ||
    authUser.email ||
    "New User";

  const [created] = await db
    .insert(usersTable)
    .values({
      authId: authUser.id,
      displayName,
      email: authUser.email ?? `${authUser.id}@users.pawhub.local`,
      city: "",
      avatarUrl: authUser.profileImageUrl ?? null,
    })
    .returning();
  return created.id;
}
