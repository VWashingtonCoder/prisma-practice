import { prisma } from "./prisma";

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = () => {
  const users = prisma.user.findMany({
    orderBy: {
      username: "asc",
    },
  });
  return users;
};
