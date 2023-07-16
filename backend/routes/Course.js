const express = require("express");
const router = express.Router();
const CourseModel = require("../models/course");
const CourseTrack = require("../models/Course_tarck");

// router.post("/singletopic", (req, res) => {
//   const { data } = req.body;
//   con.query("select * from topics where id = ?", data.t_id, (err, result) => {
//     if (err) {
//       res.status(400).json({
//         data: { error: err },
//       });
//     } else {
//       res.status(200).json({
//         data: { result },
//       });
//     }
//   });
// });

// router.post("/enroll", (req, res) => {
//   const { data } = req.body;
//   con.query(
//     "insert into courses_track (c_id,u_id,status) values (?,?,?)",
//     [data.c_id, data.username, "yes"],
//     (err, result) => {
//       if (err) {
//         res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         res.status(200).json({
//           data: { sucess: true },
//         });
//       }
//     }
//   );
// });

// router.post("/t", (req, res) => {
//   const { data } = req.body;
//   con.query(
//     "select * from topics where c_id = ? ",
//     data.c_id,
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         let r = result;
//         let track = {};
//         con.query(
//           "select * from topics_track where c_id = ? and u_id = ?",
//           [data.c_id, data.username],
//           (err, result) => {
//             if (err) {
//               return res.status(400).json({
//                 data: { error: err },
//               });
//             } else if (result && result.length == 0) {
//               const course_data = {
//                 c_data: r,
//                 track: track,
//               };
//               return res.status(200).json({
//                 data: { course_data },
//               });
//             } else {
//               console.log(result.length);
//               for (let i = 0; i < result.length; i++) {
//                 track[result[i].t_id] = result[i].t_id;
//               }
//               const course_data = {
//                 c_data: r,
//                 track: track,
//               };
//               return res.status(200).json({
//                 data: { course_data },
//               });
//             }
//           }
//         );
//       }
//     }
//   );
// });

// router.post("/topic", (req, res) => {
//   const { data } = req.body;
//   // console.log(" topic " + data.username);
//   con.query("select * from courses where id = ? ", data.c_id, (err, result) => {
//     if (err) {
//       return res.status(400).json({
//         data: { error: err },
//       });
//     } else {
//       let r = result;
//       let track = {};
//       con.query(
//         "select * from courses_track where c_id = ? and u_id = ?",
//         [data.c_id, data.username],
//         (err, result) => {
//           if (err) {
//             return res.status(400).json({
//               data: { error: err },
//             });
//           } else if (result && result.length == 0) {
//             const course_data = {
//               c_data: r,
//               track: track,
//             };
//             return res.status(200).json({
//               data: { course_data },
//             });
//           } else {
//             console.log(result.length);
//             track[result[0].c_id] = result[0].c_id;
//             const course_data = {
//               c_data: r,
//               track: track,
//             };
//             return res.status(200).json({
//               data: { course_data },
//             });
//           }
//         }
//       );
//     }
//   });
// });

router.post("/all", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(req.body);

    const courses = await CourseModel.find();

    let track = {};
    const courseTracks = await CourseTrack.find({ u_id: data.username });

    if (courseTracks && courseTracks.length === 0) {
      let course_data = {
        c_data: courses,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      for (let i = 0; i < courseTracks.length; i++) {
        track[courseTracks[i].c_id] = courseTracks[i].c_id;
      }
      let course_data = {
        c_data: courses,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

// router.post("/topiccomplete", (req, res) => {
//   const { data } = req.body;
//   con.query(
//     "insert into topics_track (c_id,t_id,u_id,status) values (?,?,?,?)",
//     [data.c_id, data.t_id, data.u_id, "yes"],
//     (err, result) => {
//       if (err) {
//         res.status(400).json({
//           data: { error: err },
//         });
//       } else {
//         res.status(200).json({
//           data: { sucess: true },
//         });
//       }
//     }
//   );
// });

module.exports = router;
