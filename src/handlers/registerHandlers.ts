import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../queries/insert.js";
import bcrypt from "bcryptjs";
import { RegisterBody } from "../utils/types.js";

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as RegisterBody;

      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) throw error;

        await createUser({ username, password: hash });
      });

      reply.send("user registered");
}