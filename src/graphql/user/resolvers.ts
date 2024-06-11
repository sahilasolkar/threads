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
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUserService(payload);
    return res.id;
  },
};
export const resolvers = { queries, mutations };
