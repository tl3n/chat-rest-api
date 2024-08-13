import { createError } from "@fastify/error";

export const notFoundError = createError("NotFound", "Page not found", 404);
export const userAlreadyExists = createError("UserAlreadyExists", "User already exists", 400);
export const missingUserError = createError("MissingUser", "User not found", 400);
export const missingFileError = createError("MissingFile", "Missing file", 400);
export const fileTooBigError = createError("FileTooBig", "File size is too big", 400);
export const pageOutOfRange = createError("PageOutOfRange", "Page out of range", 400);
export const missingMessageError = createError("MissingMessage", "No message with such id", 400);