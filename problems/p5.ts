import { sumBy } from "remeda";
import { prisma } from "./prisma";
import { Movie } from "@prisma/client";

// hint: find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  const moviesWithAverageScore: Movie[] = [];

  movies.forEach((movie) => {
    const { starRatings, ...rest } = movie;
    const averageScore =
      sumBy(starRatings, (star) => star.score) / starRatings.length;

    if (averageScore > n) moviesWithAverageScore.push({ ...rest });
  });

  return moviesWithAverageScore;
};
