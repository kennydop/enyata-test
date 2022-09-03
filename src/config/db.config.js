const Client = require("pg").Client;

const isProduction = process.env.NODE_ENV === "production";
console.log(process.env.NODE_ENV);
const db = isProduction
  ? new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Client();

db.connect();

module.exports = db;
