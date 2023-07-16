const express = require("express");
const router = express.Router();

// router.post("/", (req, res) => {
//   const { data } = req.body;
//   console.log(data.username);
//   con.query("select * from certificate", (err, result) => {
//     if (err) {
//       return res.status(400).json({
//         data: { error: err },
//       });
//     } else {
//       //   console.log("second");
//       const r = result;
//       const track = {};
//       con.query(
//         "select * from certificate_track where u_id = ? ",
//         data.username,
//         (err, result) => {
//           if (err) {
//             return res.status(400).json({
//               data: { error: err },
//             });
//           } else if (result && result.length == 0) {
//             let couse_data = {
//               c_data: r,
//               track: track,
//             };
//             return res.status(200).json({
//               data: { couse_data },
//             });
//           } else {
//             for (let i = 0; i < result.length; i++) {
//               track[result[i].c_id] = result[i].c_id;
//             }
//             let couse_data = {
//               c_data: r,
//               track: track,
//             };
//             return res.status(200).json({
//               data: { couse_data },
//             });
//           }
//         }
//       );
//     }
//   });
// });

// router.post("/dashboard", (req, res) => {
//   const { data } = req.body;
//   con.query(
//     "select * from questions where c_id = ?",
//     data.c_id,
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         const r = result;
//         track = {};
//         con.query(
//           "select * from certificate_que_track where c_id = ? and u_id = ?",
//           [data.c_id, data.username],
//           (err, result) => {
//             if (err) {
//               return res.status(400).json({
//                 data: { error: err },
//               });
//             } else if (result && result.length == 0) {
//               const couse_data = {
//                 c_data: r,
//                 track: track,
//               };
//               return res.status(200).json({
//                 data: { couse_data },
//               });
//             } else {
//               for (let i = 0; i < result.length; i++) {
//                 track[result[i].t_id] = result[i].t_id;
//               }
//               let couse_data = {
//                 c_data: r,
//                 track: track,
//               };
//               return res.status(200).json({
//                 data: { couse_data },
//               });
//             }
//           }
//         );
//       }
//     }
//   );
// });

// router.post("/question", (req, res) => {
//   const { data } = req.body;
//   console.log(data);
//   con.query(
//     "select * from questions where id = ?",
//     data.t_id,
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         return res.status(200).json({
//           data: { result },
//         });
//       }
//     }
//   );
// });

// router.post("/solved", (req, res) => {
//   const { data } = req.body;
//   con.query(
//     "insert into certificate_que_track (c_id,t_id,u_id,status) values (?,?,?,?)",
//     [data.c_id, data.t_id, data.username, "yes"],
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
