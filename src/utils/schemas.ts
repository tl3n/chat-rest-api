import { Type } from "@fastify/type-provider-typebox";

export const registerSchema = {
  schema: {
    description: "register a new user",
    body: Type.Object({
      username: Type.String(),
      password: Type.String(),
    }),
    response: {
      201: Type.Object(
        {
          id: Type.Integer(),
          username: Type.String(),
        },
        { description: "new user created successfully" }
      ),
      400: Type.String({ description: "user already exists" }),
    },
  },
};

export const messageTextSchema = {
  schema: {
    description: "send a new text message",
    body: Type.Object({
      content: Type.String(),
    }),
    response: {
      201: Type.Object(
        {
          id: Type.Integer(),
          content: Type.String(),
          type: Type.String(),
          userId: Type.Number(),
          sentAt: Type.String(),
          fileId: Type.Null(),
        },
        { description: "new message created and sent successfully" }
      ),
    },
  },
};

export const messageFileSchema = {
  schema: {
    description: "send a new file message. use multipart/form-data",
    response: {
      201: Type.Object(
        {
          id: Type.Integer(),
          name: Type.String(),
          contentType: Type.String(),
          path: Type.String(),
        },
        { description: "new file created and sent successfully" }
      ),
      400: Type.String({
        description:
          "error while creating a file. either too absent or file is too big",
      }),
    },
  },
};

export const messageListSchema = {
  schema: {
    description: "get a message list with a pagination",
    querystring: {
      page: Type.Optional(Type.Integer({ minimum: 1 })),
      limit: Type.Optional(Type.Integer({ minimum: 1 })),
    },
    response: {
      200: Type.Object(
        {
          messages: Type.Array(
            Type.Object({
              id: Type.Integer(),
              content: Type.String(),
              type: Type.String(),
              userId: Type.Integer(),
              sentAt: Type.String(),
              fileId: Type.String(),
            })
          ),
          pagination: Type.Object({
            prevPage: Type.Integer(),
            currentPage: Type.Integer(),
            nextPage: Type.Union([Type.Integer(), Type.Null()]),
            pagesCount: Type.Number(),
            messagesCount: Type.Number(),
          }),
        },
        { description: "messages successfully retrieved" }
      ),
      400: Type.String({ description: "page out of number" }),
    },
  },
};

export const messageContentSchema = {
  schema: {
    description: "Get the content of a specific message",
    params: {
      id: Type.Integer({ minimum: 1 }),
    },
    response: {
      200: Type.String({
        description: "message contents successfully retrieved",
      }),
      400: Type.String({ description: "message or file not found" }),
    },
  },
};
