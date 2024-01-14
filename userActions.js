import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import getCurrentDate from "./actualDate.js";
import { insertUser } from "./insertActions.js";

export async function newUser(user) {
  const conf = await getUser(user.email_address);
  if (conf.message) {
    insertUser(user);
    return { message: "user registered successfully" };
  } else {
    return { message: "user already registered" };
  }
}

export async function getUser(email) {
  const user = db
    .prepare("SELECT * FROM users WHERE email_address = ?")
    .get(email);
  if (!user) {
    return { message: "Could not find user" };
  } else {
    return user;
  }
}

export async function deleteUser(email) {
  const date = getCurrentDate();

  const stmt = db.prepare(
    "UPDATE users  SET  deleted_at = ? WHERE email_address = ?"
  );
  const ret = stmt.run(date, email);
  if (ret.changes === 0) {
    return { message: "Could not find user" };
  } else {
    return { message: "User deleted successfully" };
  }
}
