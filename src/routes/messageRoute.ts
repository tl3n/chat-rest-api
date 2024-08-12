import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { uploadFile } from "../controllers/messageController.js";
import { createMessage } from "../queries/insert.js";

const messageRoute: FastifyPluginAsyncTypebox = async (app, opts) => {
  app.post(
    "/message/text",
    {
      preHandler: app.basicAuth,
      schema: {
        body: Type.Object({
          content: Type.String(),
        }),
      },
    },
    async (request, reply) => {
      // writing message to the db
      await createMessage({
        userId: request.userId!,
        type: "text",
        content: request.body.content.trim(),
      });
      reply.send("message sent successfully");
    }
  );

  app.post(
    "/message/file",
    {
      preHandler: app.basicAuth,
    },
    uploadFile
  );
};

export default messageRoute;
