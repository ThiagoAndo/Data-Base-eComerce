import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { getCart } from "./cartActions.js";
import getCurrentDate from "./actualDate.js";
import { getProductById, updateProductQnt } from "./productActions.js";
import { updateCartPurchased } from "./cartActions.js";
import { products } from "./productsData.js";

export async function insertUser(user) {
  const currentDate = getCurrentDate();
  db.prepare(
    `
    INSERT INTO users
      (email_address, first_name, last_name,id, password, created_at)
    VALUES (
      @email_address,
      @first_name,
      @last_name,
      @id,
      @password,
      @created_at
    )
  `,
  ).run({
    ...user,
    created_at: currentDate,
  });
}

export function insertCard({ creation_at, user_id, item_id, qnt }) {
  let currentDate = "";
  if (!creation_at) {
    currentDate = getCurrentDate();
  } else {
    currentDate = creation_at;
  }
  db.prepare(
    `
    INSERT INTO cart
      ( user_id, item_id, qnt, bought, creation_at)
    VALUES (
      @user_id,
      @item_id,
      @qnt,
      @bought,
      @creation_at
    )
  `,
  ).run({
    user_id,
    item_id,
    qnt,
    bought: 0,
    creation_at: currentDate,
  });
}

export async function insertOrder({ id = null, user_id }) {
  let sum = 0;
  let currentDate = getCurrentDate();
  const cart = await getCart(user_id, 0);

  let creation_at = cart[0].creation_at;

  const getItemId = cart.map((item) => {
    return item.item_id.toString();
  });

  let values = await getProductById({
    tableCol: "price",
    productRows: getItemId.join(),
  });

  for (var i = 0; i < values.length; i++) {
    sum += values[i].price * cart[i].qnt;
  }

  db.prepare(
    `
    INSERT INTO orders
      (invoice_id,cart_id, user_id, paid_at, total)
    VALUES (
      null,
      @cart_id,
      @user_id,
      @paid_at,
      @total
    )
  `,
  ).run({
    id,
    cart_id: creation_at,
    user_id,
    paid_at: currentDate,
    total: sum,
  });

  updateCartPurchased(creation_at);
  updateProductQnt(cart);
}

export async function insertProduct(product) {
  const prts = product || products;
  const stmt = db.prepare(`
      INSERT INTO products VALUES (
         @id,
         @title,
         @description,
         @price,
         @discountPercentage,
         @rating,
         @stock,
         @brand,
         @category,
         @thumbnail
      )
   `);

  const stmt2 = db.prepare(`
      INSERT INTO images VALUES (
         @itemId,
         @image
      )
   `);

  for (const product of prts) {
    product.id = String(product.id);
    stmt.run(product);
    for (const img in product.images) {
      stmt2.run({
        itemId: product.id,
        image: Object.values(product.images)[img],
      });
    }
  }
}
