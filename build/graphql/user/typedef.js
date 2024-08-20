"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type User{
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageURL: String
    posts: [Post!]
    following: [User!]
    followers: [User!]
  }

  type Post {
    id: ID!
    content: String!
    imageURL: String!
    createdAt: String!
    user: User
    userId: String
    comments: [Comment!]
    likes: [Like!]
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
    user: User!
    post: Post!
  }

  type Like {
    id: ID!
    createdAt: String!
    user: User!
    post: Post!
  }

  type Follow {
    id: ID!
    follower: User!
    followee: User!
    createdAt: String!
  }
`;
