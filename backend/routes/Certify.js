const express = require("express");
const router = express.Router();
const con = require("../db");

router.post("/", (req, res) => {
  const { data } = req.body;
  console.log(data.username);
  con.query("select * from certificate", (err, result) => {
    if (err) {
      return res.status(400).json({
        data: { error: err },
      });
    } else {
      //   console.log("second");
      const r = result;
      const track = {};
      con.query(
        "select * from certificate_track where u_id = ? ",
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
