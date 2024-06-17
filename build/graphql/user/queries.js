"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
  getUserToken(email: String!, password:String!): String
  getCurrentLoggedInUser: User
  getPosts: [Post!]
  getPostById: [Post!]
  getFollowing: [User!]
  getFollowers: [User!]
`;
