const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  database: "code_master",
  user: "root",
  password: "1234",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = con;
