import sql from "better-sqlite3";

const db = sql("e-comerce.db");

function getCurrentDate() {
  const date = new Date("2024-12-23");
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let currentDate = `${Number(day) < 10 ? 0 : ""}${day}-${
    Number(month) < 10 ? 0 : ""
  }${month}-${year}  ${new String(new Date(Date.now())).slice(15, 24)}`;

  return currentDate;
}

function insertUser({ id, emailAddress, firstName, lastName }) {
  const currentDate = getCurrentDate();
  db.prepare(
    `
    INSERT INTO users
      (id,email_address, first_name, last_name, created_at,deleted_at)
    VALUES (
      null,
      @emailAddress,
      @firstName,
      @lastName,
      @createdAt,
      @deletedAt
    )
  `
  ).run({
    id,
    emailAddress,
    firstName,
    lastName,
    createdAt: currentDate,
    deletedAt: null,
  });
}

insertUser({
  id: 1,
  emailAddress: "ando.thiago@g.com",
  firstName: "Thiago",
  lastName: "Freitas",
});

async function getUser() {
  return db.prepare("SELECT * FROM users").all();
}

async function print() {
  const prt = await getUser();
  console.log(prt);
}

// db.prepare("DROP TABLE users").run();

print();

function getMeal(slug) {
  return db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);
}
