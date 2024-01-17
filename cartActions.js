import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { insertCard } from "./insertActions.js";

export async function getCart(id, bought, creation_at) {
  const col = creation_at || "*";
  const cart = db
    .prepare(`SELECT ${col}  FROM cart WHERE user_id = ? AND bought = ?`)
    .all(id, bought);
  if (!cart) {
    return { message: "No cart found" };
  } else {
    return cart;
  }
}

export async function updateCart({ user_id, item_id, qnt }) {
  const cart = await getCart(user_id, 0, "creation_at");
  if (cart.length === 0) {
    insertCard({
      user_id,
      item_id,
      qnt,
      creation_at: false,
    });
  } else {
    insertCard({
      user_id,
      item_id,
      qnt,
      creation_at: cart[0].creation_at,
    });
  }
}

export async function updateCartPurchased(creation_at) {
  const stmt = db.prepare("UPDATE cart  SET  bought = ? WHERE creation_at = ?");
  const ret = stmt.run(1, creation_at);
}

export async function deleteCart(id) {
  const stmt = db.prepare("DELETE  FROM  cart WHERE user_id = ?");
  const ret = stmt.run(id);
  console.log("cart ======================================");
  console.log(ret);
}
