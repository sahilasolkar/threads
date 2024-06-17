import { prismaClient } from "../lib/db";

export interface likePostPayload {
  postId: string;
  userId: string;
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
}

export default likeService;
