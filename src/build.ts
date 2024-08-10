import fastify, { FastifyServerOptions } from "fastify";
import { createError } from "@fastify/error";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export async function build(opts?: FastifyServerOptions) {
  // opts here may be undefined.
  // it's ok, because then fastify() is called with default settings.
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ error });
    reply.code(error.statusCode || 500);
    return { error };
  });

  app.setNotFoundHandler(async (request, response) => {
    const notFoundError = createError("NotFound", "Page not found", 404);
    throw new notFoundError();
  });

  return app;
}
