import { User } from "../graphql/user";
import { prismaClient } from "../lib/db";

export interface createCommentPayload {
  content: string;
  userId: string;
  postId: string;
}

export interface getCommentByPostIdPayload {
  postId: string;
}

class commentService {
  public static createCommentService(payload: createCommentPayload) {
    const { content, postId, userId } = payload;
    return prismaClient.comment.create({
      data: {
        content,
        postId,
        userId,
        updatedAt: new Date(),
      },
      include: { user: true, post: true },
    });
  }

  public static getCommentByPostIdService(payload: getCommentByPostIdPayload) {
    const { postId } = payload;

    return prismaClient.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });
  }
}

export default commentService;
