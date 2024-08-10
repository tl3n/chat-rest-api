import { FastifyServerOptions } from "fastify";
import { build } from "./src/build.js";
import dotenv from "dotenv";

dotenv.config();

let opts: FastifyServerOptions = {
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
};

const app = await build(opts);

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

await app.listen({ port, host });
