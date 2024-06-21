"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
  createUser(firstName: String!, lastName: String, email: String!, password: String!): String
  createPost(content: String!, imageUrl: String!): Post
  createComment(content: String!, postId: String!): Comment
  likePost(postId: String!): Like
  followUser(followeeId: ID!): Follow!
  unfollowUser(followeeId: ID!): Boolean
`;
