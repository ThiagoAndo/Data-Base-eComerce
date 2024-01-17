import sql from "better-sqlite3";
const db = sql("e-comerce.db");

export async function deleteImage(id) {
  const stmt = db.prepare("DELETE  FROM  images WHERE id = ?");
  const ret = stmt.run(id);
  console.log("images======================================");
  console.log(ret);
}
