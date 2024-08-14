import {
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import {
  textHandler,
  fileHandler,
  listHandler,
  contentHandler,
} from "../handlers/messageHandlers.js";
import { MessageTextBody } from "../utils/types.js";
import { messageTextSchema, messageListSchema, messageFileSchema, messageContentSchema } from "../utils/schemas.js";

const messageRoute: FastifyPluginAsyncTypebox = async (app) => {
  app.post<{ Body: MessageTextBody }>("/message/text", { ...messageTextSchema, preHandler: app.basicAuth }, textHandler);

  app.post("/message/file", { ...messageFileSchema, preHandler: app.basicAuth }, fileHandler);

  app.get("/message/list", { ...messageListSchema, preHandler: app.basicAuth }, listHandler);

  app.get("/message/content/:id", { ...messageContentSchema, preHandler: app.basicAuth }, contentHandler);
};

export default messageRoute;
