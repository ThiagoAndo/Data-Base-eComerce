import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { products } from "./productsData.js";

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS products (
       id INTEGER PRIMARY KEY,
       title TEXT NOT NULL UNIQUE,
       description TEXT NOT NULL,
       price FLOAT NOT NULL,
       discountPercentage FLOAT NOT NULL,
       rating FLOAT NOT NULL,
       stock INT NOT NULL,
       brand TEXT NOT NULL,
       category TEXT NOT NULL,
       thumbnail TEXT NOT NULL
    )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS images (
       item_id INTEGER,
       image TEXT NOT NULL,
       FOREIGN KEY (item_id)
       REFERENCES products (id) 
         )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS users (
      id  INTEGER PRIMARY KEY AUTOINCREMENT,
      email_address      TEXT NOT NULL UNIQUE,
      first_name         TEXT NOT NULL,
      last_name          TEXT NOT NULL,
      created_at         TIMESTAMP,
      deleted_at         TIMESTAMP
      )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS cart (
      user_id  INTEGER,
      item_id  INTEGER,
      qnt      INTEGER,
      bought   INTEGER,
      creation_at TIMESTAMP NOT NULL,
      FOREIGN KEY (item_id)
      REFERENCES products (id),
      FOREIGN KEY (user_id)
      REFERENCES users (id) 
         )
`,
).run();
db.prepare(
  `
   CREATE TABLE IF NOT EXISTS orders (
      invoice_id  INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id         INTEGER,
      user_id         INTEGER,
      paid_at         TIMESTAMP,
      total           REAL,
      FOREIGN KEY (user_id)
      REFERENCES users (id)
      )
`
).run();

async function initData({ fromDummy, product }) {
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
  if (fromDummy) {
    for (const product of products) {
      stmt.run(product);
      for (const img in product.images) {
        stmt2.run({
          itemId: product.id,
          image: Object.values(product.images)[img],
        });
      }
    }
  } else {
    stmt.run(product);
    stmt2.run({
      itemId: product.id,
      image: Object.values(product.images)[img],
    });
  }
}
//  initData({fromDummy:true});

// console.log(Object.values(products[0].images)[0]);
