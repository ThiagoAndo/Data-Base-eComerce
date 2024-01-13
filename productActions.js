import sql from "better-sqlite3";
const db = sql("e-comerce.db");

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

export async function updateProductQnt(cart, qnt) {
  let stmt = db.prepare(
    `UPDATE products  SET stock =((SELECT stock FROM products WHERE id =?)-?)  WHERE id  = ?`
  );
  let ret = stmt.run(cart,qnt,cart);
}
// updateProductQnt(10, 1);