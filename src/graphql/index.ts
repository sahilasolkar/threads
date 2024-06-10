import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
  type Query {
    hello: String
  }
  type Mutation {
    ${User.mutations}
  }
  `,
    resolvers: {
      Query: { ...User.resolvers.queries },
      Mutation: { ...User.resolvers.mutations },
    },
  });

  //start the graphql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
