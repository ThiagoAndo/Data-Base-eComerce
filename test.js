import sql from "better-sqlite3";
const db = sql("e-comerce.db");

import { insertCard, insertProduct, insertUser } from "./insertActions.js";
import getCurrentDate from "./actualDate.js";
import {
  getUser,
  deleteUser,
  updateUserData,
  changePassword,
} from "./userActions.js";
import { getCart } from "./cartActions.js";
import { updateCart } from "./cartActions.js";
import { getOrders } from "./ordersActions.js";
import { newOrder } from "./ordersActions.js";
import { getProductById, getCategories, newProduct } from "./productActions.js";
import { newUser } from "./userActions.js";
import { insertOrder } from "./insertActions.js";

// const product = [
//   {
//     id: "1p0lrhxzer6",
//     title: "this is just a test",
//     description: "Again just a test",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 94,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     ],
//   },
// ];

// newProduct(product);

// newUser({
//   email_address: "ando.thiago@g.com",
//   first_name: "Thiago",
//   last_name: "Freitas",
//   password: '1234'

// });

// newUser({
//   email_address: "ando.norimar@gmail.com",
//   first_name: "Norimar",
//   last_name: "Ando",
//   password: '123456'
// })

// updateUserData({
//   newEmail:'ando.thiago@gmal.com',
//   email: "ando.norimar@gmail.com",
//   first: "Thiago",
//   last: "Ando",
// })

// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "1",
//   qnt: 3,
// });

// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "2",
//   qnt: 3,
// });
// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "3",
//   qnt: 3,
// });

// deleteUser("ando.thiago@gmal.com")

// newOrder(2)

// changePassword("54321", "ando.norimar@gmail.com");

async function printU() {
  const prt = await getUser("ando.norimar@gmail.com", "123456");
  console.log(prt);
}

// printU();
async function printC() {
  const prt = await getCart("1p0lrhxzer6", 0);
  console.log(prt);
}
// printC();
async function printO() {
  const prt = await getOrders(2);
  console.log(prt);
}

async function printP() {
  const prt = await getProductById({ productRows: "1p0lrhxzer6" });
  console.log(prt);
}
printP();

async function printCate() {
  const prt = await getCategories();
  console.log(prt);
}
// printCate();

// db.prepare("DROP TABLE cart").run();
// console.log(deleteUser("ando.thiago@g.com"));
