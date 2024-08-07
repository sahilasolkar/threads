import { prismaClient } from "../lib/db";

export interface likePostPayload {
  postId: string;
  userId: string;
}
export interface unlikePostPayload {
  postId: string;
  userId: string;
}

export interface getLikesByPostIdPayload {
  postId: string;
}

class likeService {
  public static likePostService(payload: likePostPayload) {
    const { postId, userId } = payload;
    return prismaClient.like.create({
      data: {
        postId,
        userId,
      },
      include: { user: true, post: true },
    });
  }

  public static unlikePostService(payload: unlikePostPayload) {
    const { postId, userId } = payload;
    return prismaClient.like.deleteMany({
      where: { postId: { contains: postId }, userId: { contains: userId } },
    });
  }

  public static getLikesByPostIdService(payload: getLikesByPostIdPayload) {
    const { postId } = payload;

    return prismaClient.like.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });
  }
}

export default likeService;
