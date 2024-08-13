import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs";
import util from "node:util";
import { pipeline } from "node:stream";
import {
  missingFileError,
  fileTooBigError,
  pageOutOfRange,
  missingMessageError,
} from "../utils/errors.js";
import { createMessage, createFile } from "../queries/insert.js";
import {
  getFileById,
  getMessageById,
  getMessagesCount,
  getMessagesPagination,
} from "../queries/select.js";
import { MessageTextBody, MessageListQueryParams } from "../utils/types.js"

export const textHandler = async (request: FastifyRequest<{ Body: MessageTextBody }>, reply: FastifyReply) => {
  // writing message to the db
  const message = await createMessage({
    userId: request.userId as number,
    type: "text",
    content: request.body.content.trim(),
  });
  reply.send(message);
};

export const fileHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  // check if file was sent
  const data = await request.file();
  if (!data) {
    throw new missingFileError();
  }

  // create /uploads if it doesn't exist
  await fs.promises.mkdir("./uploads", { recursive: true });

  // change filename so they wouldn't overwrite
  const filename = Date.now() + "-" + data.filename.trim();
  const filepath = `./uploads/${filename}`;

  // upload file to the /uploads
  const pump = util.promisify(pipeline);
  await pump(data.file, fs.createWriteStream(filepath));

  // check if file is too big
  if (data.file.truncated) {
    await fs.promises.unlink(filepath);
    throw new fileTooBigError();
  }

  // writing file data to the db
  const file = await createFile(request.userId as number, {
    name: filename,
    contentType: data.mimetype,
    path: filepath,
  });

  reply.send(file);
};

export const listHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { page = 1, limit = 10 } = request.query as MessageListQueryParams;

  const offset = (page - 1) * limit;
  const messagesCount = (await getMessagesCount())[0].count;
  const pagesCount = Math.ceil(messagesCount / limit);

  if (page > pagesCount) {
    throw new pageOutOfRange();
  }

  const messages = await getMessagesPagination(limit, offset);
  const pagination = {
    prevPage: page > 1 ? page - 1 : null,
    currentPage: page,
    nextPage: page < pagesCount ? page + 1 : null,
    pagesCount,
    messagesCount,
  };

  reply.send({
    messages,
    pagination,
  });
};

export const contentHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const message = (await getMessageById(id))[0];

  if (!message) {
    throw new missingMessageError();
  }

  if (message.type === "text") {
    reply.header("content-type", "text/plain").send(message.content);
  } else {
    const file = (await getFileById(message.fileId!))[0];
    let content: Buffer;

    try {
      content = fs.readFileSync(file.path);
    } catch (error) {
      throw new missingFileError();
    }
    

    reply.header("content-type", file.contentType).send(content);
  }
};
