import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return { hello: "world"};
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen({ port, host });