import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import uniqid from "uniqid";

import { deleteProduct } from "./productActions.js";
import { deleteCart } from "./cartActions.js";
import getCurrentDate from "./library/actualDate.js";
import { insertUser } from "./insertActions.js";
import { deleteOrders } from "./ordersActions.js";

export async function newUser(user) {
  user.id = uniqid();
  user.password = await hash(user.password, 12);

  const conf = getUser(user.email_address);
  if (conf.message) {
    insertUser(user);
    return { message: "user registered successfully" };
  } else {
    return { message: "user already registered" };
  }
}

export async function getUser(email, password) {
  const user = db
    .prepare("SELECT * FROM users WHERE email_address = ?")
    .get(email);
  if (!user) {
    return { message: "Could not find user" };
  } else {
    const isValid = await compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      return { message: "Wrong Password" };
    }
  }
}

export function deleteUser(email, id) {
  deleteOrders(id);
  deleteCart(id);
  deleteProduct(id);

  const stmt = db.prepare("DELETE  FROM users WHERE email_address = ?");
  const ret = stmt.run(email);
  console.log("deleteUser======================================");

  console.log(ret);
}

export function updateUserData({ newEmail, first, last, email }) {
  let stmt = db.prepare(
    `UPDATE users  SET email_address=?,first_name=?, last_name=? WHERE email_address  = ?`,
  );
  const ret = stmt.run(newEmail, first, last, email);
  console.log(ret);
}

export async function changePassword(newPassword, email) {
  const password = await hash(newPassword, 12);

  let stmt = db.prepare(
    `UPDATE users  SET password =? WHERE email_address  = ?`,
  );
  const ret = stmt.run(password, email);
  console.log(ret);
}
