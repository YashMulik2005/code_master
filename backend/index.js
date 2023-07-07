const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyPerser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();
const courseRoute = require("./routes/Course");
const userRoute = require("./routes/User");
const practiceRoute = require("./routes/Practice");

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
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

app.use("/course", courseRoute);
app.use("/user", userRoute);
app.use("/practice", practiceRoute);

app.listen(3000, () => {
  console.log("server is running");
});
