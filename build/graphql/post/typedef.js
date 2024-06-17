"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedef = void 0;
exports.typedef = `#graphql
type Post {
  id: ID!
  content: String!
  imageURL: String!
  createdAt: String!
  user: User!
  comments: [Comment!]
  likes: [Like!]
}
`;
