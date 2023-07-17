const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/compiler", async (req, res) => {
  const { requestdata } = req.body;
  console.log(requestdata);

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "639e388a10msh3ccd60adff600b9p1f174djsn211b87c4474a",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: requestdata.language,
      version: "latest",
      code: requestdata.code,
      input: requestdata.input,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      data: { err: error },
    });
  }
});

// router.get("/:topic", (req, res) => {
//   const { topic } = req.params;
//   if (topic == "all") {
//     console.log("all");
//     con.query("select * from questions", (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         return res.status(200).json({
//           data: { result },
//         });
//       }
//     });
//   } else {
//     console.log("topic");
//     con.query("select * from questions where topic=?", topic, (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         return res.status(200).json({
//           data: { result },
//         });
//       }
//     });
//   }
// });

// router.post("/question/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   console.log(req.session.username);
//   console.log(id);
//   con.query("select * from questions where id=?", id, (err, result) => {
//     if (err) {
//       return res.status(400).json({
//         data: { error: err },
//       });
//     } else {
//       let ans = result;
//       con.query(
//         "select * from question_track where q_id= ? and u_id = ?",
//         [id, data.username],
//         (err, result) => {
//           if (err) {
//             return res.status(400).json({
//               data: { error: err },
//             });
//           } else {
//             if (result && result.length > 0) {
//               let r = {
//                 q_data: ans,
//                 status: "solved",
//               };
//               return res.status(200).json({
//                 data: { r },
//               });
//             } else {
//               let r = {
//                 q_data: ans,
//                 status: "unsolved",
//               };
//               return res.status(200).json({
//                 data: { r },
//               });
//             }
//           }
//         }
//       );
//     }
//   });
// });

// router.post("/solved", (req, res) => {
//   const { data } = req.body;
//   console.log(data.username);
//   console.log(data.id);
//   con.query(
//     "insert into question_track (q_id,u_id,status) values (?,?,?)",
//     [data.id, data.username, "solved"],
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         return res.status(200).json({
//           data: { sucess: true },
//         });
//       }
//     }
//   );
// });

module.exports = router;
