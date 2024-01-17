import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { insertCard, insertUser } from "./insertActions.js";
import getCurrentDate from "./actualDate.js";
import { getUser, deleteUser, updateUserData } from "./userActions.js";
import { getCart } from "./cartActions.js";
import { updateCart } from "./cartActions.js";
import { getOrders } from "./ordersActions.js";
import { newOrder } from "./ordersActions.js";
import { getProductById, getCategories } from "./productActions.js";
import { newUser } from "./userActions.js";
import { insertOrder } from "./insertActions.js";

// newUser({
//   id: 1,
//   email_address: "ando.thiago@g.com",
//   first_name: "Thiago",
//   last_name: "Freitas",
// });

  newUser({
    email_address: "ando.norimar@gmail.com",
    first_name: "Norimar",
    last_name: "Ando",
    password: '123456'
  })

  
  // updateUserData({
  //   newEmail:'ando.thiago@gmal.com',
  //   email: "ando.norimar@gmail.com",
  //   first: "Thiago",
  //   last: "Ando",
  // })

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

// deleteUser("ando.thiago@gmal.com")

// newOrder(2)

async function printU() {
  const prt = await getUser("ando.thiago@gmal.com");
  console.log(prt);
}
// printU()
async function printC() {
  const prt = await getCart(2, 0);
  console.log(prt);
}

async function printO() {
  const prt = await getOrders(2);
  console.log(prt);
}

async function printP() {
  const prt = await getProductById({ productRows: "1,2,3" });
  console.log(prt);
}
// printP()

async function printCate() {
  const prt = await getCategories();
  console.log(prt);
}
// printCate();


// db.prepare("DROP TABLE cart").run();
// console.log(deleteUser("ando.thiago@g.com"));
