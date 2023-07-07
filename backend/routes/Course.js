const express = require("express");
const router = express.Router();
const con = require("../db");

router.post("/singletopic", (req, res) => {
  const { data } = req.body;
  con.query("select * from topics where id = ?", data.t_id, (err, result) => {
    if (err) {
      res.status(400).json({
        data: { error: err },
      });
    } else {
      res.status(200).json({
        data: { result },
      });
    }
  });
});

router.post("/enroll", (req, res) => {
  const { data } = req.body;
  con.query(
    "insert into courses_track (c_id,u_id,status) values (?,?,?)",
    [data.c_id, data.username, "yes"],
    (err, result) => {
      if (err) {
        res.status(400).json({
          data: { error: err },
        });
      } else {
        res.status(200).json({
          data: { sucess: true },
        });
      }
    }
  );
});

router.post("/t", (req, res) => {
  const { data } = req.body;
  con.query(
    "select * from topics where c_id = ? ",
    data.c_id,
    (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      } else {
        let r = result;
        let track = {};
        con.query(
          "select * from topics_track where c_id = ? and u_id = ?",
          [data.c_id, data.username],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                data: { error: err },
              });
            } else if (result && result.length == 0) {
              const course_data = {
                c_data: r,
                track: track,
              };
              return res.status(200).json({
                data: { course_data },
              });
            } else {
              console.log(result.length);
              track[result[0].c_id] = result[0].c_id;
              const course_data = {
                c_data: r,
                track: track,
              };
              return res.status(200).json({
                data: { course_data },
              });
            }
          }
        );
      }
    }
  );
});

router.post("/topic", (req, res) => {
  const { data } = req.body;
  con.query("select * from courses where id = ? ", data.c_id, (err, result) => {
    if (err) {
      return res.status(400).json({
        data: { error: err },
      });
    } else {
      let r = result;
      let track = {};
      con.query(
        "select * from courses_track where c_id = ? and u_id = ?",
        [data.c_id, data.username],
        (err, result) => {
          if (err) {
            return res.status(400).json({
              data: { error: err },
            });
          } else if (result && result.length == 0) {
            const course_data = {
              c_data: r,
              track: track,
            };
            return res.status(200).json({
              data: { course_data },
            });
          } else {
            console.log(result.length);
            track[result[0].c_id] = result[0].c_id;
            const course_data = {
              c_data: r,
              track: track,
            };
            return res.status(200).json({
              data: { course_data },
            });
          }
        }
      );
    }
  });
});

router.post("/all", (req, res) => {
  const { data } = req.body;
  console.log(req.body);
  con.query("select * from courses", (err, result) => {
    if (err) {
      return res.status(400).json({
        data: { error: err },
      });
    } else {
      let r = result;
      let track = {};
      con.query(
        "select * from courses_track where u_id = ?",
        data.username,
        (err, result) => {
          if (err) {
            return res.status(400).json({
              data: { error: err },
            });
          } else if (result && result.length == 0) {
            let couse_data = {
              c_data: r,
              track: track,
            };
            return res.status(200).json({
              data: { couse_data },
            });
          } else {
            for (let i = 0; i < result.length; i++) {
              track[result[i].c_id] = result[i].c_id;
            }
            let couse_data = {
              c_data: r,
              track: track,
            };
            return res.status(200).json({
              data: { couse_data },
            });
          }
        }
      );
    }
  });
});

module.exports = router;
