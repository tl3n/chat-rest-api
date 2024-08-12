import { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs";
import util from "node:util";
import { pipeline } from "node:stream";
import { missingFileError, fileTooBigError } from "../errors.js";
import { createFile } from "../queries/insert.js";

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
