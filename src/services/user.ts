import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto";

const JWT_SECRET = "$uperman";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHashedPassword(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static createUserService(payload: CreateUserPayload) {
    const { email, firstName, lastName, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHashedPassword(salt, password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User Not Found");

    const userSalt = user.salt;
    const usersHashedPassword = UserService.generateHashedPassword(
      userSalt,
      password
    );

    if (usersHashedPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen token
    const token = JWT.sign({ email: user.email, id: user.id, firstName: user.firstName }, JWT_SECRET);
    return token;
  }
}

export default UserService;
