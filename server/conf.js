const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b4a7d8d8e501a6",
  password: "48fd29d3",
  database: "heroku_7c7293d37102ee4",
});

module.exports = connection;