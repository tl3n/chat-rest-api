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
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

export async function build(opts?: FastifyServerOptions) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  // fastify plugins
  // OpenAPI documentation
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Chat REST API",
        description: "using Fastify, Drizzle ORM and a couple more stuff",
        version: "6.9"
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    staticCSP: true
  });

  // Basic Authentication
  app.register(fastifyBasicAuth, { validate: validateUser, authenticate: true });
  
  // File uploads
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
    //request.log.error({ error });
    reply.code(error.statusCode || 500).send({"error": error.message});
  });

  app.setNotFoundHandler(async () => {
    throw new notFoundError();
  });

  return app;
}
