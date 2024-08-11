import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { createUser } from "../queries/insert.js";
import bcrypt from "bcryptjs";

const registerRoute: FastifyPluginAsyncTypebox = async (app, opts) => {
  app.post(
    "/register",
    {
      schema: {
        body: Type.Object({
          username: Type.String(),
          password: Type.String(),
        }),
      },
    },
    async (request, reply) => {
      const { username, password } = request.body;

      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) throw error;

        await createUser({ username, password: hash });
      });

      reply.send("user registered");
    }
  );
};

export default registerRoute;
