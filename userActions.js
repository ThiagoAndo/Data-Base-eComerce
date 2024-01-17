import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import uniqid from "uniqid";

import getCurrentDate from "./actualDate.js";
import { insertUser } from "./insertActions.js";

export async function newUser(user) {
  user.id = uniqid();
  user.password = await hash(user.password, 12);

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

  const stmt = db.prepare("DELETE  FROM users WHERE email_address = ?");
  const ret = stmt.run(email);
  console.log(ret);
}

export async function updateUserData({ newEmail, first, last, email }) {
  let stmt = db.prepare(
    `UPDATE users  SET email_address=?,first_name=?, last_name=? WHERE email_address  = ?`
  );
  const ret = stmt.run(newEmail, first, last, email);
  console.log(ret);
}

export async function changePassword({ newPassword, email }) {
  const password = await hash(newPassword, 12);

  let stmt = db.prepare(
    `UPDATE users  SET password =? WHERE email_address  = ?`
  );
  const ret = stmt.run(password, email);
  console.log(ret);
}
