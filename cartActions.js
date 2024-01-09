import sql from "better-sqlite3";
const db = sql("e-comerce.db");

export async function getCart(id, bought) {
  const cart = db
    .prepare("SELECT * FROM cart WHERE user_id = ? AND bought = ?")
    .all(id, bought);
  if (!cart) {
    return { message: "No cart found" };
  } else {
    return cart;
  }
}
