import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  return prisma.movie.findMany({
    select: {
      parentalRating: true,
      releaseYear: true,
    },
    where: {
      parentalRating: "PG-13",
    },
    orderBy: {
      releaseYear: "desc",
    },
  });
};
