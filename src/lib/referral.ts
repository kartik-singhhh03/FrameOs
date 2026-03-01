import prisma from "./prisma";

/**
 * Extends a user's free Pro access by one calendar month.
 * Stacks on top of an existing future date rather than overwriting it.
 */
export async function extendProAccess(userId: string): Promise<Date> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, freeProUntil: true },
  });

  if (!user) throw new Error(`extendProAccess: user not found (id=${userId})`);

  const now = new Date();
  const baseDate =
    user.freeProUntil !== null && user.freeProUntil > now
      ? new Date(user.freeProUntil)
      : new Date(now);

  baseDate.setMonth(baseDate.getMonth() + 1);

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { freeProUntil: baseDate },
    select: { freeProUntil: true },
  });

  return updated.freeProUntil as Date;
}
