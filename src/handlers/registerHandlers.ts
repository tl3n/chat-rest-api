import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../queries/insert.js";
import bcrypt from "bcryptjs";
import { RegisterBody } from "../utils/types.js";
import { getUserByUsername } from "../queries/select.js";
import { userAlreadyExists } from "../utils/errors.js";

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as RegisterBody;
  if (await getUserByUsername(username)) {
    throw new userAlreadyExists();
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, password: hash });    

  reply.send(user);
};
