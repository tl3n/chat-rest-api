import { getUserByUsername } from "../queries/select.js";
import bcrypt from "bcryptjs";
import { missingUserError } from "./errors.js";
import { FastifyRequest } from "fastify";

export async function validateUser(username: string, password: string, request: FastifyRequest) {
  const user = (await getUserByUsername(username))[0];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new missingUserError();
  }

  request.userId = user.id;
}

declare module "fastify" {
  interface FastifyRequest {
    userId?: number;
  }
}