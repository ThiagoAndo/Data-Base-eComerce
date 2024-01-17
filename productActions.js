import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { insertProduct } from "./insertActions.js";

export async function getAllProducts() {
  const products = db.prepare(`SELECT * FROM products`).all();
}

export async function getProductById({ tableCol, productRows }) {
  let cols = tableCol || "*";
  const products = db
    .prepare(`SELECT ${cols}  FROM products WHERE id= ?`)
    .all(productRows);
  if (!products) {
    return { message: "No cart found" };
  } else {
    return products;
  }
}

export async function updateProductQnt(carts) {
  carts.map((cart) => {
    let stmt = db.prepare(
      `UPDATE products  SET stock =((SELECT stock FROM products WHERE id =?)-?)  WHERE id  = ?`,
    );
    let ret = stmt.run(cart.item_id, cart.qnt, cart.item_id);
  });
}

export async function getCategories() {
  const categories = db
    .prepare(
      `SELECT category, COUNT(DISTINCT category) AS qnt FROM products GROUP BY category`,
    )
    .all();

  return categories;
}

export async function deleteProduct(id) {
  const stmt = db.prepare("DELETE  FROM  products WHERE id = ?");
  const ret = stmt.run(id);
  console.log("product======================================");
  console.log(ret);
}

export async function newProduct(newProduct) {
  insertProduct(newProduct);
}
