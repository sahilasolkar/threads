import { prismaClient } from "../lib/db";

export interface createPostPayload {
  content: string;
  imageUrl: string;
}

class PostService {
  public static createPostService(payload: createPostPayload, userId: string) {
    return prismaClient.post.create({
      data: {
        content: payload.content,
        imageURL: payload.imageUrl,
        userId: userId,
      },
      include: { user: true, likes: true, comments: true },
    });
  }

  public static getPosts() {
    return prismaClient.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public static getPostById(id: string) {
    return prismaClient.post.findMany({
      where: { userId: id },
      include: {
        user: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
    });
  }
}

export default PostService;
