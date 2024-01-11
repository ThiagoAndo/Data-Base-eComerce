import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import getCurrentDate from "./actualDate.js";

export async function getProductById({ tableCol, productRows }) {
  let cols = tableCol || "*";
  const products = db
    .prepare(`SELECT ${cols}  FROM products WHERE id IN (${productRows})`)
    .all();
  if (!products) {
    return { message: "No cart found" };
  } else {
    return products;
  }
}

