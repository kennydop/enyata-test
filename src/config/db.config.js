const Client = require("pg").Client;

const db = new Client();
db.connect();

module.exports = db;
