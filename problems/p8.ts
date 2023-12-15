import { maxBy, minBy, groupBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
    const ratings = await prisma.starRating.findMany();
    const groupedRatings = groupBy(ratings, (rating) => rating.userId);
    const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
        const scores = ratings.map((rating) => rating.score);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        return { userId: Number(userId), average };
    });
    const grumpiest = minBy(averages, (average) => average.average);
    return grumpiest?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
    const ratings = await prisma.starRating.findMany();
    const groupedRatings = groupBy(ratings, (rating) => rating.userId);
    const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
        const scores = ratings.map((rating) => rating.score);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        return { userId: Number(userId), average };
    });
    const nicest = maxBy(averages, (average) => average.average);
    return nicest?.userId;
};
