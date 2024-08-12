import { createError } from "@fastify/error";

export const notFoundError = createError("NotFound", "Page not found", 404);
export const missingUserError = createError("MissingUser", "User not found", 400);
export const missingFileError = createError("MissingFile", "Missing file", 400);
