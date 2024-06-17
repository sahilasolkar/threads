export const queries = `#graphql
  getUserToken(email: String!, password:String!): String
  getCurrentLoggedInUser: User
  getPosts: [Post!]
  getPostById: [Post!]
  getFollowing: [User!]
  getFollowers: [User!]
`;
