const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  database: "sql6631299",
  user: "sql6631299",
  password: "KHflXWDGAm",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = con;
