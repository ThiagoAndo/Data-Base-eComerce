import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { insertCard, insertUser } from "./insertActions.js";
import getCurrentDate from "./actualDate.js";
import { getUser, deleteUser } from "./userActions.js";
import { getCart } from "./cartActions.js";

// insertUser({
//   id: 1,
//   email_address: "ando.thiago@g.com",
//   first_name: "Thiago",
//   last_name: "Freitas",
// });

// insertUser({
//   id: null,
//   email_address: "ferreira.Eduardo@g.comm",
//   first_name: "eduardo",
//   last_name: "ferreira",
// });

// insertCard({
//   id: null,
//   user_id: 1,
//   item_id: 1,
//   qnt: 1,
// });

// insertCard({
//   user_id: 2,
//   item_id: 2,
//   qnt: 1,
// });

// insertCard({
//   user_id: 2,
//   item_id: 12,
//   qnt: 4,
// });

// insertCard({
//   user_id: 2,
//   item_id: 34,
//   qnt: 3,
// });

// db.prepare("DROP TABLE cart").run();
// console.log(deleteUser("ando.thiago@g.com"));

// async function printU() {
//   const prt = await getUser("ferreira.Eduardo@g.comm");
//   console.log(prt);
// }

async function printC() {
  const prt = await getCart(2, 0);

  prt.forEach((item) => {
    console.log(item.item_id);
  });
}

printC();
