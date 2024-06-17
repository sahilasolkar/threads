import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../lib/db";

class FollowService {
  public static followUserService({
    followeeId,
    followerId,
  }: {
    followeeId: string;
    followerId: string;
  }) {
    return prismaClient.follow.create({
      data: {
        followeeId,
        followerId,
      },
      include: {
        followee: true,
        follower: true,
      },
    });
  }

  public static getfollowingService(userId: string) {
    return prismaClient.follow.findMany({
      where: { followerId: userId },
      include: { followee: true },
    });
  }

  public static getFollowersService(userId: string) {
    return prismaClient.follow.findMany({
      where: { followeeId: userId },
      include: { follower: true },
    });
  }
}

export default FollowService;
