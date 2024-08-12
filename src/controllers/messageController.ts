import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs";
import util from "node:util";
import { pipeline } from "node:stream";
import { missingFileError, fileTooBigError, pageOutOfRange } from "../errors.js";
import { createFile } from "../queries/insert.js";
import { getMessagesCount, getMessagesPagination } from "../queries/select.js";

type PaginationQueryParams = { page: number; limit: number };

export const uploadFile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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
  await createFile(request.userId!, {
    name: filename,
    contentType: data.mimetype,
    path: filepath,
  });

  reply.send("file uploaded successfully");
};

export const getMessagesList = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page = 1, limit = 10 } = request.query as PaginationQueryParams;

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
