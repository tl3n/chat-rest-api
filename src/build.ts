import fastify, {
  FastifyServerOptions,
} from "fastify";
import { notFoundError } from "./utils/errors.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { registerRoute } from "./routes/registerRoute.js";
import messageRoute from "./routes/messageRoute.js";
import fastifyMultipart from "@fastify/multipart";
import fastifyBasicAuth from "@fastify/basic-auth";
import { validateUser } from "./utils/utils.js";

export async function build(opts?: FastifyServerOptions) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  // fastify plugins
  app.register(fastifyBasicAuth, { validate: validateUser, authenticate: true });
  app.register(fastifyMultipart, {
    limits: {
      files: 1,
      fileSize: 5242880, // 5 MB
    },
  });

  // routes 
  app.register(registerRoute);
  app.register(messageRoute);

  app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ error });
    reply.code(error.statusCode || 500);
    return { error };
  });

  app.setNotFoundHandler(async () => {
    throw new notFoundError();
  });

  return app;
}
