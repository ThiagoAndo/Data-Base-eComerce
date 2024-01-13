import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { insertCard, insertUser } from "./insertActions.js";
import getCurrentDate from "./actualDate.js";
import { getUser, deleteUser } from "./userActions.js";
import { getCart } from "./cartActions.js";
import { updateCart } from "./cartActions.js";
import { getOrders } from "./ordersActions.js";
import { newOrder } from "./ordersActions.js";
import { getProductById } from "./productActions.js";
import { newUser } from "./userActions.js";

// insertUser({
//   id: 1,
//   email_address: "ando.thiago@g.com",
//   first_name: "Thiago",
//   last_name: "Freitas",
// });

newUser({
  id:null,
  email_address: "ferreira.@frasw.comm",
  first_name: "Sonia",
  last_name: "ferreira",
});

// updateCart({
//   user_id: 2,
//   item_id: 1,
//   qnt: 3,
// });

// updateCart({
//   user_id: 2,
//   item_id: 2,
//   qnt: 3,
// });
// updateCart({
//   user_id: 2,
//   item_id: 3,
//   qnt: 3,
// });

async function printU() {
  const prt = await getUser("ferreira.Eduardo@g.comm");
  console.log(prt);
}

async function printC() {
  const prt = await getCart(2, 0);
  console.log(prt);
}

async function printO() {
  const prt = await getOrders(2);
  console.log(prt);
}

async function printP() {
  const prt = await getProductById({ productRows: '1,2,3'});
  console.log(prt);
}
// newOrder(2)
// printC();

// db.prepare("DROP TABLE cart").run();
// console.log(deleteUser("ando.thiago@g.com"));
