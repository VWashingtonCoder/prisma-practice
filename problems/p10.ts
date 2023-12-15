import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const usersUnderAgeN = await prisma.user.findMany({
    where: { age: { lt: n } },
  });
  const userIds = usersUnderAgeN.map((user) => user.id);

  await prisma.starRating.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });
};
