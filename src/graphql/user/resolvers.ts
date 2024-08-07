import { User } from ".";
import { prismaClient } from "../../lib/db";
import commentService, {
  getCommentByPostIdPayload,
} from "../../services/comment";
import FollowService from "../../services/follow";
import likeService from "../../services/like";
import PostService, { createPostPayload } from "../../services/post";
import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
  },

  // post resolver queries
  getPosts: async () => {
    const posts = await PostService.getPosts();
    return posts;
  },

  getPostById: async (_: any, payload: any, context: any) => {
    if (!context.user) throw new Error("Authentication required");
    if (context && context.user) {
      const post = await PostService.getPostById(context.user.id);
      if (post.length == 0)
        throw new Error(
          `No Posts found for the User - ${context.user.firstName}, id -${context.user.id}`
        );
      return post;
    }
  },

  // follower and followee resolver queries
  getFollowing: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const following = await FollowService.getfollowingService(
        context.user.id
      );
      return following?.map((follow) => follow.followee);
    }
    throw new Error("Unauthorised");
  },

  getFollowers: async (_: any, parameters: any, context: any) => {
    const follower = await FollowService.getFollowersService(context.user.id);
    return follower?.map((follow) => follow.follower);
  },
  getFeed: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const following = await FollowService.getfollowingService(
        context.user.id
      );

      const followeeIds = following.map((follow) => follow.followeeId);

      const posts = await prismaClient.post.findMany({
        where: {
          userId: {
            in: followeeIds,
          },
        },
        include: {
          user: true,
          comments: {
            include: { user: true },
          },
          likes: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return posts;
    }

    throw new Error("Unauthorised");
  },

  // comment resolver queries

  getCommentByPostId: async (
    _: any,
    { postId }: { postId: string },
    context: any
  ) => {
    if (context && context.user) {
      const comment = await commentService.getCommentByPostIdService({
        postId,
      });
      return comment;
    }
    throw new Error("Unauthorised");
  },

  // likes resolver queries
  getLikesByPostId: async (
    _: any,
    { postId }: { postId: string },
    context: any
  ) => {
    if (context && context.user) {
      const likes = await likeService.getLikesByPostIdService({
        postId,
      });
      return likes;
    }
    throw new Error("Unauthorised");
  },
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUserService(payload);
    return res.id;
  },

  // post resolver mutations
  createPost: async (_: any, payload: createPostPayload, context: any) => {
    if (!context.user) throw new Error("Authentication required");
    if (context && context.user) {
      const res = await PostService.createPostService(payload, context.user.id);
      return res;
    }
  },

  // comment resolver mutations
  createComment: async (
    _: any,
    { postId, content }: { postId: string; content: string },
    context: any
  ) => {
    if (context && context.user) {
      const comment = await commentService.createCommentService({
        content,
        postId,
        userId: context.user.id,
      });
      return comment;
    }
    throw new Error("Unauthroized");
  },

  likePost: async (_: any, { postId }: { postId: string }, context: any) => {
    if (context && context.user) {
      const like = await likeService.likePostService({
        postId,
        userId: context.user.id,
      });
      return like;
    }
    throw new Error("Unauthorised");
  },

  unlikePost: async (_: any, { postId }: { postId: string }, context: any) => {
    if (context && context.user) {
      const like = await likeService.unlikePostService({
        postId,
        userId: context.user.id,
      });
      return like.count;
    }
  },

  // follower and followee resolver mutations
  followUser: async (
    _: any,
    { followeeId }: { followeeId: string },
    context: any
  ) => {
    if (context && context.user) {
      const follow = await FollowService.followUserService({
        followeeId,
        followerId: context.user.id,
      });

      return follow;
    }

    throw new Error("Unauthorised");
  },

  unfollowUser: async (
    _: any,
    { followeeId }: { followeeId: string },
    context: any
  ) => {
    if (context && context.user) {
      const follow = await FollowService.unfollowUserService({
        followeeId,
        followerId: context.user.id,
      });

      return true;
    }

    throw new Error("Unauthorised");
  },
};
export const resolvers = { queries, mutations };
