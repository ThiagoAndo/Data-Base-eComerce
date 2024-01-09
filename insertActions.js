import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { getCart } from "./cartActions.js";
import getCurrentDate from "./actualDate.js";

export async function insertUser({
  id = null,
  email_address,
  first_name,
  last_name,
}) {
  const currentDate = getCurrentDate();
  db.prepare(
    `
    INSERT INTO users
      (id,email_address, first_name, last_name, created_at, deleted_at)
    VALUES (
      null,
      @email_address,
      @first_name,
      @last_name,
      @created_at,
      @deleted_at
    )
  `
  ).run({
    id,
    email_address,
    first_name,
    last_name,
    created_at: currentDate,
    deleted_at: null,
  });
}

let ctrDate = 0;
let currentDate = null;

export function insertCard({ user_id, item_id, qnt }) {
  if (ctrDate === 0) {
    currentDate = getCurrentDate();
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
  `
  ).run({
    user_id,
    item_id,
    qnt,
    bought: 0,
    creation_at: currentDate,
  });

  ctrDate++;
}

export async function insertOrder({ id, cart_id, user_id }) {
  const cart = await getCart(user_id, 0);
  console.log(cart[0]);
  const currentDate = getCurrentDate();
  // db.prepare(
  //   `
  //   INSERT INTO cart
  //     (id, user_id, item_id, qnt, bought, creation_at)
  //   VALUES (
  //     null,
  //     @cart_id,
  //     @user_id,
  //     @paid_at,
  //     @bought,
  //     @total
  //   )
  // `
  // ).run({
  //   id,
  //   cart_id,
  //   user_id,
  //   paid_at,
  //   paid_at: currentDate,
  //   total: 0,
  // });
}

insertOrder({ user_id: 2 });
