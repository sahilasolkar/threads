import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import UserService from "./services/user";
import cors from "cors";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000", // Frontend URL
      credentials: true, // If you need to allow cookies or other credentials
    })
  );

  app.get("/", (req, res) => {
    res.json({ message: "server is up and running" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}

init();
