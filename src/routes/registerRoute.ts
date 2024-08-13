import {
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { registerSchema } from "../utils/schemas.js";
import { registerHandler } from "../handlers/registerHandlers.js";

export const registerRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/register", registerSchema, registerHandler)
};
