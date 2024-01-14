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

export async function updateProductQnt(carts) {
  carts.map((cart) => {
    let stmt = db.prepare(
      `UPDATE products  SET stock =((SELECT stock FROM products WHERE id =?)-?)  WHERE id  = ?`
    );
    let ret = stmt.run(cart.item_id, cart.qnt, cart.item_id);
  });
}

export async function getCategories() {
  const categories = db
    .prepare(`SELECT category, COUNT(DISTINCT category) AS qnt FROM products GROUP BY category`)
    .all();

  return categories;
}
