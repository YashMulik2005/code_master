const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const CourseModel = require("../models/course");
const CourseTrack = require("../models/Course_tarck");

// router.post("/add", async (req, res) => {
//   try {
//     const { data } = req.body;
//     const course = new CourseTrack({
//       c_id: data.c_id,
//       u_id: data.username,
//       status: "completed",
//     });
//     await course.save();
//     return res.status(200).json({
//       data: { success: true },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({
//       data: { error: err },
//     });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { data } = req.body;
    const user = await UserModel.findOne({ username: data.username });

    if (!user) {
      return res.status(200).json({
        data: { success: false },
      });
    } else {
      if (data.password === user.password) {
        return res.status(200).json({
          data: { success: true },
        });
      } else {
        return res.status(200).json({
          data: { success: false },
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/sighup", async (req, res) => {
  try {
    const { data } = req.body;

    const existingUser = await UserModel.findOne({ username: data.username });

    if (existingUser) {
      return res.status(200).json({
        data: { success: false },
      });
    }

    const newUser = new UserModel({
      username: data.username,
      email: data.email,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
    });

    await newUser.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

module.exports = router;
