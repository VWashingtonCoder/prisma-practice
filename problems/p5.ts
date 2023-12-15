import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
    // const movies = await prisma.movie.findMany({
    //     include: {
    //     starRatings: true,
    //     },
    // });

    const starRatings = await prisma.starRating.findMany({
        include: {
        movie: true,
        },
    });

    const movies = groupBy(starRatings, (star) => star.movieId);

    console.log(movies);
    // const result = map(movies, (movie) => {
    //     const averageScore = sumBy(movie, (star) => star.score) / movie.length;
    //     const ratings = movie.filter((star) => star.score > 3);

    //     return {
    //         ...movie,
    //         averageScore,
    //         starRatings: ratings,
    //     };
    // });


    
    // const moviesWithAverageScore = movies.map((movie) => {
    //     const averageScore = sumBy(movie.starRatings, (star) => star.score) / movie.starRatings.length;
    //     const ratings = movie.starRatings.filter((star) => star.score > 3);

    //    const movieWithAverageScore = {
    //     ...movie,
    //     averageScore,
    //     starRatings: ratings,
    //     };

    //     console.log(movieWithAverageScore);
    //     return movieWithAverageScore;
    // });
    
    // const result = moviesWithAverageScore.filter((movie) => movie.averageScore > n);

    // console.log(result);
    // return result;
};
