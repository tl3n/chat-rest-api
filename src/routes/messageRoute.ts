import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { uploadFile } from "../controllers/messageController.js";

const messageRoute: FastifyPluginAsyncTypebox = async (app, opts) => {
  app.post(
    "/message/file",
    {
      preHandler: app.basicAuth,
    },
    uploadFile
  );
};

export default messageRoute;
