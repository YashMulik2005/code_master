const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const bodyPerser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyPerser.json());
app.use(cookieParser());
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

app.listen(3000, () => {
  console.log("server is running");
});

app.post("/sighup", (req, res) => {
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

app.post("/login", (req, res) => {
  const { data } = req.body;
  con.query(
    "select * from users where username= ?",
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
          console.log(req.session.username);
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

app.get("/", (req, res) => {
  console.log(req.session.username);
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

app.get("/profile", (req, res) => {
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

app.post("/compiler", async (req, res) => {
  const { data } = req.body;
  console.log(data);

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "889bf3837dmsh57d912de5b21951p16e2aajsn065c692abb41",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: data.language,
      version: "latest",
      code: data.code,
      input: data.input,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
  } catch (error) {
    return res.status(200).json({
      data: { result: error },
    });
  }
});

app.get("/practice/:topic", (req, res) => {
  const { topic } = req.params;
  if (topic == "all") {
    console.log("all");
    con.query("select * from questions", (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      } else {
        return res.status(200).json({
          data: { result },
        });
      }
    });
  } else {
    console.log("topic");
    con.query("select * from questions where topic=?", topic, (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      } else {
        return res.status(200).json({
          data: { result },
        });
      }
    });
  }
});

app.post("/practice/question/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  console.log(req.session.username);
  console.log(id);
  con.query("select * from questions where id=?", id, (err, result) => {
    if (err) {
      return res.status(400).json({
        data: { error: err },
      });
    } else {
      let ans = result;
      con.query(
        "select * from question_track where q_id= ? and u_id = ?",
        [id, data.username],
        (err, result) => {
          if (err) {
            return res.status(400).json({
              data: { error: err },
            });
          } else {
            if (result && result.length > 0) {
              let r = {
                q_data: ans,
                status: "solved",
              };
              return res.status(200).json({
                data: { r },
              });
            } else {
              let r = {
                q_data: ans,
                status: "unsolved",
              };
              return res.status(200).json({
                data: { r },
              });
            }
          }
        }
      );
    }
  });
});

app.post("/solved", (req, res) => {
  const { data } = req.body;
  console.log(data.username);
  console.log(data.id);
  con.query(
    "insert into question_track (q_id,u_id,status) values (?,?,?)",
    [data.id, data.username, "solved"],
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
});
