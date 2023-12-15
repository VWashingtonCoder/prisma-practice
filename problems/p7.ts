import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
    const ratings = await prisma.starRating.findMany({
        where: {
            userId: userId
        }
    });
    const scores = ratings.map((rating) => rating.score);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
};
