const express = require("express");
const router = express.Router();
const con = require("../db");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

router.get("/profile", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(200).json({
        data: { sucess: false },
      });
    } else {
      return res.status(200).json({
        data: { sucess: true },
      });
    }
  });
});

router.get("/", (req, res) => {
  // console.log(req.session.username);
  if (req.session.username) {
    return res.status(200).json({
      data: { sucess: true, username: req.session.username },
    });
  } else {
    return res.status(200).json({
      data: { sucess: false },
    });
  }
});

router.post("/login", (req, res) => {
  const { data } = req.body;
  con.query(
    "select * from users where username= ? ",
    data.username,
    (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      }
      if (result && result.length == 0) {
        return res.status(200).json({
          data: { sucess: false },
        });
      } else {
        if (data.password == result[0].password) {
          req.session.username = result[0].username;
          return res.status(200).json({
            data: { sucess: true },
          });
        } else {
          return res.status(200).json({
            data: { sucess: true },
          });
        }
      }
    }
  );
});

router.post("/sighup", (req, res) => {
  const { data } = req.body;
  con.query(
    "select * from users where username=?",
    data.username,
    (err, result) => {
      if (result && result.length > 0) {
        return res.status(200).json({
          data: { sucess: false },
        });
      } else {
        con.query(
          "insert into users (username,email,password,fname,lname) values (?,?,?,?,?)",
          [data.username, data.email, data.password, data.fname, data.lname],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                data: { error: err },
              });
            } else {
              return res.status(200).json({
                data: { sucess: true },
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
