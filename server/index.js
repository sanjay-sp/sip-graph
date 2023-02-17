const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const Register = require("./model/register");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  () => {
    console.log("Connected to MongoDB");
  },
  (e) => console.error(e)
);

app.post("/api/login", async (req, res) => {
  const user = await Register.findOne({
    email: req.body.email,
  });

  const pwd = await bcrypt.compare(req.body.password, user.password);

  if (user && pwd) {
    const token = jwt.sign(
      {
        name: user.name,
      },
      "encrypttoken"
    );
    return res.json({ user: token });
  } else {
    return res.json({ user: null });
  }
});

app.post("/api/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  try {
    await Register.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });
    return res.json({ message: "created user" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ message: "user exists" });
    }
  }
});

app.post("/api/calculate", async (req, res) => {
  const p = parseInt(req.body.p);
  const i = parseFloat(req.body.i);
  const n = parseInt(req.body.n);
  const r = parseInt(req.body.r);

  const fv = (p * (Math.pow(1 + i, n) - 1)) / i;

  //p * [(1 + i) ^ (n - 1)] * (1 + i)) / i;

  return res.json({
    return_amt: fv - p * n,
    invested_amount: p * n,
    total_value: p + fv,
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html");
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Connected at PORT 5000");
});
