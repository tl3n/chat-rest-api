import fastify, {
  FastifyServerOptions,
} from "fastify";
import { notFoundError } from "./errors.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import registerRoute from "./routes/registerRoute.js";
import messageRoute from "./routes/messageRoute.js";
import fastifyMultipart from "@fastify/multipart";
import fastifyBasicAuth from "@fastify/basic-auth";
import { validateUser } from "./utils.js";

export async function build(opts?: FastifyServerOptions) {
  // opts here may be undefined.
  // it's ok, because then fastify() is called with default settings.
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  app.register(fastifyBasicAuth, { validate: validateUser, authenticate: true });
  app.register(fastifyMultipart, {
    limits: {
      files: 1,
      fileSize: 5242880, // 5 MB
    },
  });

  // TODO: move it to the routes register
  app.register(registerRoute);
  app.register(messageRoute);

  app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ error });
    reply.code(error.statusCode || 500);
    return { error };
  });

  app.setNotFoundHandler(async (request, response) => {
    throw new notFoundError();
  });

  return app;
}
