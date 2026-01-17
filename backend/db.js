const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(DB_PATH);

function runSQLFile(filename) {
  const filePath = path.join(__dirname, filename);
  const sql = fs.readFileSync(filePath, "utf-8");

  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function initDB() {
  await runSQLFile("schema.sql");
  await runSQLFile("seed.sql");
  console.log("✅ Database initialized with schema + seed data");
}

module.exports = { db, initDB };
