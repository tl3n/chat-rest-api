import { Type } from "@fastify/type-provider-typebox";

export const registerSchema = {
  schema: {
    body: Type.Object({
      username: Type.String(),
      password: Type.String(),
    }),
  },
};

export const messageTextSchema = {
  schema: {
    body: Type.Object({
      content: Type.String(),
    }),
  },
};

export const messageListSchema = {
  schema: {
    querystring: {
      page: Type.Optional(Type.Integer({ minimum: 1 })),
      limit: Type.Optional(Type.Integer({ minimum: 1 })),
    },
  },
};
