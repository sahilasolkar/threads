export const mutations = `#graphql
  createUser(firstName: String!, lastName: String, email: String!, password: String!): String
  createPost(content: String!, imageUrl: String!): Post
  createComment(content: String!, postId: String!): Comment
  likePost(postId: String!): Like
  unlikePost(postId: String!): Boolean
  followUser(followeeId: ID!): Follow!
  unfollowUser(followeeId: ID!): Boolean
`;
