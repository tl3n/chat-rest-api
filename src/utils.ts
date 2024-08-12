import { getUserByUsername } from "./queries/select.js";
import bcrypt from "bcryptjs";
import { missingUserError } from "./errors.js";

export async function validateUser(username: string, password: string) {
  const user = (await getUserByUsername(username))[0];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new missingUserError();
  }
}
