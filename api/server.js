const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./app/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const secret = "skandanmmsdbbdhhjjskssksksf";

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(
  // "mongodb+srv://blog:wxN9hsyAzCECOtCJ@cluster0.sforoyz.mongodb.net/?retryWrites=true&w=majority"
  "mongodb://127.0.0.1:27017/blog"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    console.log(userDoc);
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const comparePassword = bcrypt.compareSync(password, userDoc.password);

  if (comparePassword) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
      if (error) throw error;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("wrong credential");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
});

app.listen(4000);
//
// 41.59.49.46/32
// mongodb+srv://blog:wxN9hsyAzCECOtCJ@cluster0.sforoyz.mongodb.net/?retryWrites=true&w=majority

// wxN9hsyAzCECOtCJ
